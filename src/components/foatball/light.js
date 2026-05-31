import * as THREE from 'three';

export function addLights(scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 5);

  scene.add(light);
}