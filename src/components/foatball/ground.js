import * as THREE from 'three';

export function createGround() {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 25),
    new THREE.MeshStandardMaterial({
      color: 0x2e8b57
    })
  );

  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2;

  return ground;
}