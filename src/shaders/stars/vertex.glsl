uniform float uTime;
uniform float uSpeed;

void main(){

    vec3 pos = position;

    pos.z += mod(uTime * uSpeed * 25.0 + position.z + 200.0,400.0)-200.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos,1.0);

    gl_PointSize = (6.0 + uSpeed * 0.2) * (300.0 / -mvPosition.z);

    gl_Position = projectionMatrix * mvPosition;
}