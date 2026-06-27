import * as THREE from "three";
import { createStarMaterial } from "../materials/StarMaterial";

export function createStars() {

    const geometry = new THREE.BufferGeometry();

    const positions = [];

    for (let i = 0; i < 10000; i++) {

        positions.push(

            (Math.random() - 0.5) * 300,
            (Math.random() - 0.5) * 300,
            (Math.random() - 0.5) * 300

        );

    }

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = createStarMaterial();

    return new THREE.Points(geometry, material);

}