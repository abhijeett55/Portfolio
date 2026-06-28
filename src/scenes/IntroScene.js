import * as THREE from "three";
import "../style.css";
import { createStars } from "../components/Star";

export class IntroScene {

    constructor() {

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.renderer.setClearColor(0x000000);

        document.body.appendChild(this.renderer.domElement);

        // HTML Elements
        this.quote = document.getElementById("quote");
        this.quoteText = document.getElementById("quoteText");
        this.typeSound = document.getElementById("typeSound");

        this.message = "Start From the Beginning!!";

        // Stars
        this.stars = createStars();
        this.scene.add(this.stars);

        // Overlay Scene
        this.overlayScene = new THREE.Scene();

        this.overlayCamera = new THREE.OrthographicCamera(
            -1,
            1,
            1,
            -1,
            0,
            1
        );

        this.overlayMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0
        });

        this.overlay = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            this.overlayMaterial
        );

        this.overlayScene.add(this.overlay);

        this.clock = new THREE.Clock();

        this.startedTyping = false;

        this.animationId = null;

        // Callback (main.js can assign this)
        this.onFinish = null;

        window.addEventListener("resize", () => this.onResize());

    }

    typeWriter(text, speed = 70) {

        this.quote.classList.add("show");

        this.quoteText.textContent = "";

        let i = 0;

        const interval = setInterval(() => {

            this.quoteText.textContent += text[i];

            if (this.typeSound) {

                this.typeSound.currentTime = 0;
                this.typeSound.play().catch(() => {});

            }

            i++;

            if (i >= text.length) {

                clearInterval(interval);

                // Wait 2 seconds then notify main.js
                setTimeout(() => {

                    if (this.onFinish) {

                        this.onFinish();

                    }

                }, 2000);

            }

        }, speed);

    }

    animate = () => {

        this.animationId = requestAnimationFrame(this.animate);

        const t = this.clock.getElapsedTime();

        this.stars.material.uniforms.uTime.value = t;

        if (t < 7) {

            this.stars.material.uniforms.uSpeed.value = 1;

        } else {

            this.stars.material.uniforms.uSpeed.value =
                THREE.MathUtils.lerp(
                    this.stars.material.uniforms.uSpeed.value,
                    80,
                    0.05
                );

        }

        if (t >= 10) {

            const progress = THREE.MathUtils.clamp(
                (t - 10) / 5,
                0,
                1
            );

            this.stars.material.uniforms.uAlpha.value =
                1.0 - progress;

            this.overlayMaterial.opacity = progress;

        }

        if (t >= 15 && !this.startedTyping) {

            this.startedTyping = true;

            this.typeWriter(this.message);

        }

        this.renderer.autoClear = true;
        this.renderer.render(this.scene, this.camera);

        this.renderer.autoClear = false;
        this.renderer.render(
            this.overlayScene,
            this.overlayCamera
        );

    }

    start() {

        this.animate();

    }

    stop() {

        cancelAnimationFrame(this.animationId);

    }

    dispose() {

        this.stop();

        this.renderer.dispose();

        this.renderer.domElement.remove();

    }

    onResize() {

        this.camera.aspect =
            window.innerWidth / window.innerHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }

}