import * as THREE from "three";

export function createEarth() {

    console.log("animate");

    const geometry = new THREE.SphereGeometry(
        1.5,
        128,
        128
    );

    const material = new THREE.MeshStandardMaterial({

        color: 0x3b82f6,

        roughness: 1,

        metalness: 0

    });

    const earth = new THREE.Mesh(
        geometry,
        material
    );

    return earth;

}