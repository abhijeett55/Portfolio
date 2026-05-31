import * as THREE from 'three';

export function createBall() {
  const geometry = new THREE.SphereGeometry(1, 32, 32);

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff
  });

  const ball = new THREE.Mesh(geometry, material);
  ball.position.y = -1;

  return ball;
}