uniform float uAlpha;

void main() {

    vec2 uv = gl_PointCoord - vec2(0.5);

    float d = length(uv);

    float alpha = smoothstep(0.5, 0.0, d);

    gl_FragColor = vec4(vec3(1.0), alpha * uAlpha);

}