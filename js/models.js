import * as THREE from '../vendor/three/three.module.min.js';
import { themeColor } from './brand.js';

export function disposePackage(model) {
  const geometries=new Set(),materials=new Set(),textures=new Set();
  model.group.traverse(object=>{
    if(object.geometry) geometries.add(object.geometry);
    for(const material of (Array.isArray(object.material)?object.material:[object.material])) {
      if(!material)continue;
      materials.add(material);
      for(const value of Object.values(material))if(value?.isTexture)textures.add(value);
    }
  });
  for(const geometry of geometries)geometry.dispose();
  const images=new Set();
  for(const texture of textures){if(texture.source?.data)images.add(texture.source.data);texture.dispose();}
  for(const image of images)image.close?.();
  for(const material of materials)material.dispose();
}

export function buildPackage(pack) {
  const group=new THREE.Group();
  const materials=[];
  const material=(color)=>{const m=new THREE.MeshLambertMaterial({color});materials.push(m);return m;};
  const blue=material(themeColor('--brand-dark'));
  const cream=material(themeColor('--cream'));
  const [w,h,d]=pack.size;
  function mesh(geometry,mat,x=0,y=0,z=0) {
    const object=new THREE.Mesh(geometry,mat);object.position.set(x,y,z);group.add(object);return object;
  }
  const maps=pack.labels.map(label=>{
    const map=new THREE.CanvasTexture(label);map.colorSpace=THREE.SRGBColorSpace;
    const m=new THREE.MeshLambertMaterial({map});materials.push(m);return m;
  });
  // Cada painel define o mesmo referencial utilizado para posicionar seus pontos.
  const panels=[];
  function panel(index,width,height,position,angle) {
    const p=mesh(new THREE.PlaneGeometry(width,height),maps[index],...position);
    p.rotation.y=angle;
    panels.push({object:p,width,height,index});
  }
  if(pack.id==='leite') {
    mesh(new THREE.BoxGeometry(w,h,d),[maps[1],maps[3],blue,cream,maps[0],maps[2]]);
    const shape=new THREE.Shape();shape.moveTo(-d/2,0);shape.lineTo(0,.42);shape.lineTo(d/2,0);shape.closePath();
    const roof=mesh(new THREE.ExtrudeGeometry(shape,{depth:w,bevelEnabled:false}),blue,-w/2,h/2,0);roof.rotation.y=Math.PI/2;
    mesh(new THREE.BoxGeometry(w,.09,.055),cream,0,h/2+.42);
    const cap=mesh(new THREE.CylinderGeometry(.16,.17,.095,16),cream,-.19,h/2+.42*.57+.035,d*.23);cap.rotation.x=Math.atan2(.42,d/2);
  } else {
    const base=pack.id==='ovos'?material('#b9b294'):cream;
    mesh(new THREE.BoxGeometry(w,h,d),base);
    const foodZ=d/2+.09;
    if(pack.id==='ovos') {
      const egg=material('#d8ad78');
      for(let row=0;row<2;row++)for(let col=0;col<3;col++) {
        mesh(new THREE.TorusGeometry(.32,.055,6,14),base,(col-1)*.78,(row-.5)*.62,foodZ+.04);
        const e=mesh(new THREE.SphereGeometry(.3,16,12),egg,(col-1)*.78,(row-.5)*.62,foodZ);
        e.scale.set(1,1.22,.9);
      }
      mesh(new THREE.BoxGeometry(w,.09,.12),blue,0,-h/2+.05,foodZ);
    }
    if(pack.id==='carne') {
      const red=material('#ad4f49'),fat=material('#f4d8c2');
      for(const x of [-.52,.52]) {
        const steak=mesh(new THREE.SphereGeometry(.57,16,12),red,x,.15,foodZ);steak.scale.set(.86,1.25,.25);steak.rotation.z=x*.35;
        const vein=mesh(new THREE.TorusGeometry(.31,.025,4,18,Math.PI*1.4),fat,x,.15,foodZ+.15);vein.scale.y=1.5;
      }
    }
    if(pack.id==='queijo') {
      const cheese=material('#e6b94f');
      const shape=new THREE.Shape();shape.moveTo(-.9,-.65);shape.lineTo(.85,-.65);shape.lineTo(.1,.8);shape.closePath();
      mesh(new THREE.ExtrudeGeometry(shape,{depth:.2,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.035,bevelThickness:.025}),cheese,0,.15,foodZ);
    }
    if(pack.id==='linguica') {
      const red=material('#b3654a');
      for(const y of [-.55,.05,.65]) {
        const s=mesh(new THREE.TorusGeometry(.55,.17,8,18,Math.PI*1.5),red,0,y,foodZ);
        s.rotation.z=-.6;s.scale.y=.63;
      }
    }
    if(pack.id==='peixe') {
      const fish=material('#d3e4e9');
      for(const x of [-.4,.4]) {
        const fillet=mesh(new THREE.SphereGeometry(.65,16,10),fish,x,.15,foodZ);
        fillet.scale.set(.48,1.4,.2);fillet.rotation.z=-x*.4;
      }
      mesh(new THREE.BoxGeometry(w,.08,.06),blue,0,h/2,foodZ);
    }
  }
  // O painel frontal dos alimentos ocupa uma faixa abaixo da janela de produto.
  const frontHeight=pack.id==='leite'?h:h*.4;
  const frontY=pack.id==='leite'?0:-h*.3;
  panel(0,w,frontHeight,[0,frontY,d/2+(pack.id==='leite'?.002:.42)],0);
  panel(1,d,h,[w/2+.002,0,0],Math.PI/2);
  panel(2,w,h,[0,0,-d/2-.002],Math.PI);
  panel(3,d,h,[-w/2-.002,0,0],-Math.PI/2);
  return {group,panels,materials};
}
