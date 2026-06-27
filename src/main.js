import * as THREE from "three";
import "./style.css";
import { createStars } from "./components/Star";

const scene = new THREE.Scene();
const quote = document.getElementById("quote");
const quoteText = document.getElementById("quoteText");
const typeSound = document.getElementById("typeSound");

const message = "Start From the Beginning!!";
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

//
// Stars
//
const stars = createStars();
scene.add(stars);

//
// Fullscreen white overlay
//
const overlayScene = new THREE.Scene();

const overlayCamera = new THREE.OrthographicCamera(
    -1,
    1,
    1,
    -1,
    0,
    1
);

const overlayMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0
});

const overlay = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    overlayMaterial
);

overlayScene.add(overlay);

//
// Animation
//
const clock = new THREE.Clock();

let started = false;

function typeWriter(text, speed = 80){

    quoteText.textContent = ""

    let i = 0;

    quote.classList.add("show");

    const interval = setInterval(()=>{

        quoteText.textContent += text[i];

        // restart sound
        typeSound.currentTime = 0;
        typeSound.play().catch(() => {});

        i++;

        if(i >= text.length){

            clearInterval(interval);

        }

    },speed);

}

function animate() {

    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    // Update shader time
    stars.material.uniforms.uTime.value = t;

    // Speed up after 7 seconds
    if (t < 7) {

        stars.material.uniforms.uSpeed.value = 1;

    } else {

        stars.material.uniforms.uSpeed.value = THREE.MathUtils.lerp(
            stars.material.uniforms.uSpeed.value,
            80,
            0.05
        );

    }

    // Fade stars + overlay from 10s to 15s
    if (t >= 10) {

        const progress = THREE.MathUtils.clamp(
            (t - 10) / 5,
            0,
            1
        );

        stars.material.uniforms.uAlpha.value = 1.0 - progress;

        overlayMaterial.opacity = progress;



    }


    if(t >= 15 && !started){

        started = true;

        typeWriter(message,70);

    }

    renderer.autoClear = true;
    renderer.render(scene, camera);

    // Draw overlay on top
    renderer.autoClear = false;
    renderer.render(overlayScene, overlayCamera);

}



animate();

//
// Resize
//
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});