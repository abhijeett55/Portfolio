import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

scene.add(createGround());
scene.add(createGoalPost());

addLights(scene);

const loader = new GLTFLoader();

let football;


loader.load(
  '/models/Foatball.glb',
  (gltf) => {
    console.log('MODEL LOADED');

    football = gltf.scene;

    football.scale.set(10, 10, 10);
    football.position.set(0, 0, 0);

    scene.add(football);
  },
  undefined,
  (error) => {
    console.error(error);
  }
);

function animate() {
  requestAnimationFrame(animate);

  if (football) {
    football.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

animate();