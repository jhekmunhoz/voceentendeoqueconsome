import * as THREE from '../vendor/three/three.module.min.js';
import { buildPackage, disposePackage } from './models.js';

// Enquadramento inicial ampliado em duas etapas de 25%, exibido como 100%.
const BASE_ZOOM = 1.25 * 1.25;

export async function createViewer(host, pack, onProject, onLoss) {
  const model=pack.imported
    ? await (await import('./imported-model.js')).loadImportedModel(pack)
    : pack.id==='ovos'
    ? await (await import('./egg-model.js')).loadEggModel(pack)
    : buildPackage(pack);
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, powerPreference:'low-power' });
  } catch(error) {
    disposePackage(model);
    throw error;
  }
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden','true');
  host.append(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-2,2,2,-2,.1,20);
  camera.position.set(0,.75,7);
  camera.lookAt(0,.14,0);
  camera.updateMatrixWorld();
  const carton=model.group;
  scene.add(carton);
  scene.add(new THREE.HemisphereLight(0xfff8ef,0xe3e1d7,2));
  const light = new THREE.DirectionalLight(0xffffff,1.5);
  light.position.set(-3,5,4); scene.add(light);
  const anchors=model.panels.flatMap(panel=>(pack.anchorFaces||pack.faces)[panel.index].points.map(([key,u,v])=>({
    key,panel,position:new THREE.Vector3((u-.5)*panel.width,(.5-v)*panel.height,0),
  })));
  let frame = 0, zoom = 1, drag = null;
  let selectedFace=0;
  let freeRotation=false;
  const raycaster=new THREE.Raycaster();
  carton.updateWorldMatrix(true,true);
  // Fixa cada ponto na superfície uma única vez, para ele acompanhar a rotação.
  for(const anchor of anchors) {
    if(!pack.imported && pack.id!=='ovos')continue;
    const normal=new THREE.Vector3(0,0,1).applyQuaternion(anchor.panel.object.getWorldQuaternion(new THREE.Quaternion()));
    const world=anchor.panel.object.localToWorld(anchor.position.clone());
    raycaster.set(world.clone().addScaledVector(normal,10),normal.clone().negate());
    const hit=raycaster.intersectObject(carton,true)[0];
    if(hit && hit.point.distanceTo(world)<.3)anchor.position.copy(anchor.panel.object.worldToLocal(hit.point.clone()));
  }
  function render() {
    frame = 0;
    const w=host.clientWidth, h=host.clientHeight;
    if (!w || !h) return;
    const span = Math.max(1.98,1.35*h/w);
    camera.top=span; camera.bottom=-span;
    camera.right=span*w/h; camera.left=-camera.right;
    camera.zoom=BASE_ZOOM*zoom; camera.updateProjectionMatrix();
    renderer.render(scene,camera);
    const direction = camera.getWorldDirection(new THREE.Vector3()).negate();
    const visible = [];
    for (const {key,panel,position} of anchors) {
      const normal=new THREE.Vector3(0,0,1).applyQuaternion(panel.object.getWorldQuaternion(new THREE.Quaternion()));
      if (normal.dot(direction)<.24) continue;
      const world=panel.object.localToWorld(position.clone());
      if(pack.id==='ovos' || pack.imported) {
        const origin=world.clone().addScaledVector(direction,10);
        raycaster.set(origin,direction.clone().negate());
        const hit=raycaster.intersectObject(carton,true)[0];
        if(!hit || hit.point.distanceTo(world)>.025)continue;
      }
      const p = world.project(camera);
      if(Math.abs(p.x)<=1 && Math.abs(p.y)<=1)visible.push({key,x:(1+p.x)*w/2,y:(1-p.y)*h/2});
    }
    const quarter = Math.round(-carton.rotation.y/(Math.PI/2));
    onProject(visible,freeRotation?null:pack.views?selectedFace:((quarter%4)+4)%4);
  }
  function invalidate() { if (!frame) frame=requestAnimationFrame(render); }
  function resize() {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1,1.5));
    renderer.setSize(host.clientWidth,host.clientHeight,false);
    invalidate();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  canvas.onpointerdown = e => {
    if (!e.isPrimary || e.button!==0) return;
    drag={id:e.pointerId,x:e.clientX,y:e.clientY};
    canvas.setPointerCapture(e.pointerId);
  };
  canvas.onpointermove = e => {
    if (drag?.id!==e.pointerId) return;
    const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
    const distance=Math.hypot(dx,dy);
    if(!distance)return;
    const axis=new THREE.Vector3(dy,dx,0).normalize();
    const rotation=new THREE.Quaternion().setFromAxisAngle(axis,distance*.012);
    carton.quaternion.premultiply(rotation).normalize();
    drag.x=e.clientX;drag.y=e.clientY;freeRotation=true;
    invalidate();
  };
  canvas.onlostpointercapture = canvas.onpointercancel = canvas.onpointerup = () => {drag=null;};
  canvas.addEventListener('webglcontextlost',onLoss);
  resize();
  return {
    face(index) {
      selectedFace=index;
      freeRotation=false;
      if(pack.views)carton.rotation.fromArray(pack.views[index]);
      else carton.rotation.y = -index*Math.PI/2-.18;
      invalidate();
    },
    zoom(value) { zoom=value; invalidate(); },
    dispose() {
      observer.disconnect(); cancelAnimationFrame(frame);
      canvas.removeEventListener('webglcontextlost',onLoss);
      disposePackage(model);
      renderer.dispose(); renderer.forceContextLoss(); canvas.remove();
    },
  };
}
