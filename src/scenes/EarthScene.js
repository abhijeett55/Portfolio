import * as THREE from "three";
import "../style.css";

import { createEarth } from "../components/Earth";
import { createStars } from "../components/SolarStar";

export class EarthScene {

    constructor() {

        console.log("EarthScene Constructor");
        //
        // Scene
        //
        this.scene = new THREE.Scene();

        //
        // Camera
        //
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.camera.position.set(0, 0.5, 6);

        //
        // Renderer
        //
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.renderer.setClearColor(0x000000);

        document.body.appendChild(this.renderer.domElement);

        //
        // Lights
        //

        this.ambientLight = new THREE.AmbientLight(
            0xffffff,
            0.35
        );

        this.scene.add(this.ambientLight);

        this.sunLight = new THREE.DirectionalLight(
            0xffffff,
            4
        );

        this.sunLight.position.set(
            10,
            3,
            5
        );

        this.scene.add(this.sunLight);

        //
        // Earth
        //

        console.log(this.earth);
        this.earth = createEarth();

        this.scene.add(this.earth);

        //
        // Stars
        //

        this.stars = createStars();

        this.scene.add(this.stars);

        //
        // Clock
        //

        this.clock = new THREE.Clock();

        this.animationId = null;

        //
        // Resize
        //

        window.addEventListener(
            "resize",
            this.onResize
        );

    }

    animate = () => {

        this.animationId =
            requestAnimationFrame(this.animate);

        const elapsed =
            this.clock.getElapsedTime();

        //
        // Earth rotation
        //

        this.earth.rotation.y += 0.0015;

        //
        // Camera floating
        //

        this.camera.position.x =
            Math.sin(elapsed * 0.15) * 0.35;

        this.camera.position.y =
            Math.sin(elapsed * 0.25) * 0.15;

        this.camera.lookAt(
            this.earth.position
        );

        //
        // Rotate star field slowly
        //

        this.stars.rotation.y += 0.00005;

        //
        // Sun movement
        //

        this.sunLight.position.x =
            Math.cos(elapsed * 0.15) * 10;

        this.sunLight.position.z =
            Math.sin(elapsed * 0.15) * 10;

        //
        // Render
        //

        this.renderer.render(
            this.scene,
            this.camera
        );

    };

    start() {

        console.log("EarthScene Started");
        this.animate();

    }

    stop() {

        cancelAnimationFrame(
            this.animationId
        );

    }

    dispose() {

        this.stop();

        this.renderer.dispose();

        this.renderer.domElement.remove();

    }

    onResize = () => {

        this.camera.aspect =
            window.innerWidth /
            window.innerHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    };

}