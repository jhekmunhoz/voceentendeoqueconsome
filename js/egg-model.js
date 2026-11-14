import * as THREE from '../vendor/three/three.module.min.js';
import { GLTFLoader } from '../vendor/three/loaders/GLTFLoader.js';
import { eggSurfaces } from './eggs.js';

export async function loadEggModel(pack) {
  const gltf=await new GLTFLoader().loadAsync(new URL('../assets/models/caixa-seis-ovos.glb',import.meta.url).href);
  const group=new THREE.Group();
  const geometry=gltf.scene;
  group.add(geometry);
  const panels=eggSurfaces.map((surface,index)=>{
    const texture=new THREE.CanvasTexture(pack.labels[index]);
    texture.colorSpace=THREE.SRGBColorSpace;
    const material=new THREE.MeshLambertMaterial({map:texture,polygonOffset:true,polygonOffsetFactor:-1});
    const panel=new THREE.Mesh(new THREE.PlaneGeometry(surface.width,surface.height),material);
    panel.position.fromArray(surface.position);panel.rotation.fromArray(surface.rotation);
    geometry.add(panel);
    return {object:panel,width:surface.width,height:surface.height,index};
  });
  // Centraliza e escala o conjunto inteiro, mantendo o arquivo original intacto.
  const bounds=new THREE.Box3().setFromObject(geometry);
  const center=bounds.getCenter(new THREE.Vector3());
  geometry.position.sub(center);
  const size=bounds.getSize(new THREE.Vector3());
  group.scale.setScalar(2.8/size.x);
  return {group,panels};
}
