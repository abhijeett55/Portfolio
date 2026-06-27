import * as THREE from "three";

import vertexShader from "../shaders/stars/vertex.glsl";
import fragmentShader from "../shaders/stars/fragment.glsl";

export function createStarMaterial() {

    return new THREE.ShaderMaterial({

        vertexShader,
        fragmentShader,

    
        uniforms: {
            uTime: { value: 0 },
            uSpeed: { value: 0 },
            uAlpha: { value: 1.0 }
        },

        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending

    });

}