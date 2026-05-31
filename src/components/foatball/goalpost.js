import * as THREE from 'three';

export function createGoalPost() {
  const goal = new THREE.Group();

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff
  });

  const leftPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 3),
    material
  );

  leftPole.position.set(-2, 1.5, 0);

  const rightPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 3),
    material
  );

  rightPole.position.set(2, 1.5, 0);

  const crossBar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 4),
    material
  );

  crossBar.rotation.z = Math.PI / 2;
  crossBar.position.set(0, 3, 0);

  goal.add(leftPole);
  goal.add(rightPole);
  goal.add(crossBar);

  goal.position.set(0, -2, -12);

  return goal;
}