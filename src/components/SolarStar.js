import * as THREE from "three";

export function createStars() {

    const geometry = new THREE.BufferGeometry();

    const positions = [];

    const count = 10000;

    for(let i = 0; i < count; i++){

        positions.push(

            (Math.random()-0.5)*300,
            (Math.random()-0.5)*300,
            (Math.random()-0.5)*300

        );

    }

    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            positions,
            3
        )

    );

    const material = new THREE.PointsMaterial({

        color: 0xffffff,

        size: 0.08

    });

    return new THREE.Points(
        geometry,
        material
    );

}