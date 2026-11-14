import * as THREE from '../vendor/three/three.module.min.js';
import { GLTFLoader } from '../vendor/three/loaders/GLTFLoader.js';

export async function loadImportedModel(pack) {
  const gltf=await new GLTFLoader().loadAsync(new URL('../assets/models/'+pack.modelFile,import.meta.url).href);
  const group=new THREE.Group();
  const scene=gltf.scene;
  group.add(scene);
  const bounds=new THREE.Box3().setFromObject(scene);
  const size=bounds.getSize(new THREE.Vector3());
  const center=bounds.getCenter(new THREE.Vector3());
  const panels=pack.faces.map((face,index)=>{
    const panel=new THREE.Object3D();
    let width,height;
    if(pack.id==='leite') {
      width=.0726;height=.16125;
      panel.position.set(0,.0814,index===0?.0337:-.0337);
      panel.rotation.y=index===0?0:Math.PI;
    } else {
      width=size.x*.94;height=size.z*.94;
      panel.position.set(center.x,bounds.max.y+.0002,center.z);
      panel.rotation.x=-Math.PI/2;
    }
    scene.add(panel);
    return {object:panel,width,height,index};
  });
  scene.position.sub(center);
  group.scale.setScalar(2.8/Math.max(size.x,size.y,size.z));
  return {group,panels};
}
