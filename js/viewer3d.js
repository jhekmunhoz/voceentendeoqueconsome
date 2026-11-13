import * as THREE from '../vendor/three/three.module.min.js';
import { faces } from './milk.js';

export function createViewer(host, labels, onProject, onLoss) {
  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, powerPreference:'low-power' });
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden','true');
  host.append(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-2,2,2,-2,.1,20);
  camera.position.set(0,.75,7);
  camera.lookAt(0,.14,0);
  camera.updateMatrixWorld();
  const carton = new THREE.Group();
  scene.add(carton);
  const green = new THREE.MeshLambertMaterial({color:0x446f4e});
  const cream = new THREE.MeshLambertMaterial({color:0xffeed1});
  const sideMaterials = labels.map(label => {
    const map = new THREE.CanvasTexture(label);
    map.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshLambertMaterial({map});
  });
  const width = 1.3, depth = 1.08, height = 2.34, roof = .42;
  const body = new THREE.Mesh(new THREE.BoxGeometry(width,height,depth),
    [sideMaterials[1],sideMaterials[3],green,cream,sideMaterials[0],sideMaterials[2]]);
  carton.add(body);
  const shape = new THREE.Shape();
  shape.moveTo(-depth/2,0); shape.lineTo(0,roof); shape.lineTo(depth/2,0); shape.closePath();
  const top = new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:width,bevelEnabled:false}),green);
  top.rotation.y = Math.PI / 2;
  top.position.set(-width/2,height/2,0);
  carton.add(top);
  const seam = new THREE.Mesh(new THREE.BoxGeometry(width,.09,.055),cream);
  seam.position.y = height/2+roof;
  carton.add(seam);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(.16,.17,.095,16),cream);
  cap.rotation.x = Math.atan2(roof,depth/2);
  cap.position.set(-.19,height/2+roof*.57+.035,depth*.23);
  carton.add(cap);
  scene.add(new THREE.HemisphereLight(0xfff8ef,0xe3e1d7,2));
  const light = new THREE.DirectionalLight(0xffffff,1.5);
  light.position.set(-3,5,4); scene.add(light);
  const anchors = faces.flatMap((face, i) => face.points.map(([key,u,v]) => {
    const angle = i * Math.PI/2;
    const normal = new THREE.Vector3(Math.sin(angle),0,Math.cos(angle));
    const across = new THREE.Vector3(Math.cos(angle),0,-Math.sin(angle));
    const position = normal.clone().multiplyScalar((i%2 ? width : depth)/2);
    position.addScaledVector(across,(u-.5)*(i%2 ? depth : width));
    position.y = (.5-v)*height;
    return {key,normal,position};
  }));
  let frame = 0, zoom = 1, drag = null;
  function render() {
    frame = 0;
    const w=host.clientWidth, h=host.clientHeight;
    if (!w || !h) return;
    const span = Math.max(1.98,1.35*h/w);
    camera.top=span; camera.bottom=-span;
    camera.right=span*w/h; camera.left=-camera.right;
    camera.zoom=zoom; camera.updateProjectionMatrix();
    renderer.render(scene,camera);
    const direction = camera.getWorldDirection(new THREE.Vector3()).negate();
    const visible = [];
    for (const {key,normal,position} of anchors) {
      if (normal.clone().applyQuaternion(carton.quaternion).dot(direction)<.24) continue;
      const p = carton.localToWorld(position.clone()).project(camera);
      visible.push({key,x:(1+p.x)*w/2,y:(1-p.y)*h/2});
    }
    const quarter = Math.round(-carton.rotation.y/(Math.PI/2));
    onProject(visible,((quarter%4)+4)%4);
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
    drag={id:e.pointerId,x:e.clientX,angle:carton.rotation.y};
    canvas.setPointerCapture(e.pointerId);
  };
  canvas.onpointermove = e => {
    if (drag?.id!==e.pointerId) return;
    carton.rotation.y = drag.angle + (e.clientX-drag.x)*.013;
    invalidate();
  };
  canvas.onlostpointercapture = canvas.onpointercancel = canvas.onpointerup = () => {drag=null;};
  canvas.addEventListener('webglcontextlost',onLoss);
  resize();
  return {
    face(index) { carton.rotation.y = -index*Math.PI/2-.18; invalidate(); },
    zoom(value) { zoom=value; invalidate(); },
    dispose() {
      observer.disconnect(); cancelAnimationFrame(frame);
      canvas.removeEventListener('webglcontextlost',onLoss);
      carton.traverse(mesh => mesh.geometry?.dispose());
      for (const material of [...sideMaterials, green, cream]) { material.map?.dispose(); material.dispose(); }
      renderer.dispose(); renderer.forceContextLoss(); canvas.remove();
    },
  };
}
