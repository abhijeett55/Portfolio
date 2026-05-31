import * as THREE from 'three';

import { createBall } from './components/foatball/ball';
import { createGround } from './components/foatball/ground';
import { createGoalPost } from './components/foatball/goalpost';
import { addLights } from './components/foatball/light';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 6, 15);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// Add objects
const ball = createBall();
scene.add(ball);

scene.add(createGround());
scene.add(createGoalPost());

addLights(scene);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();