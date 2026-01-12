uniform float uTime;
uniform vec3 uColorStart; // #006680
uniform vec3 uColorEnd;   // #660044
varying vec2 vUv;
varying float vDisplacement;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Base gradient animating with time and UV
  float wave = sin(vUv.y * 5.0 + uTime * 1.5) * 0.5 + 0.5;
  vec3 color = mix(uColorStart, uColorEnd, wave + vDisplacement);
  
  // Fresnel effect
  // Simple view direction approximation in view space (camera at 0,0,0 looking down -Z)
  // For precise fresnel we need viewMatrix * modelMatrix * position etc., but standard three.js uniforms help
  // or we can use a simple dot product against the z-axis if object is centered? 
  // Let's use vNormal which is in model space. Ideally we need view vector.
  // We'll fake it with normal.z assuming camera looks at it.
  
  // Better Fresnel: 
  vec3 viewDirection = normalize(cameraPosition - vPosition); // NOTE: cameraPosition is a Three.js uniform world space?
  // Actually standard materials use vViewPosition. Let's do a simple rim light based on normal alignment to Z.
  // Since we don't have perfect world space normals/positions handy without more varying setup:
  
  float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
  
  // Add some glow based on displacement peaks (more displaced = brighter?)
  float peakGlow = smoothstep(0.1, 0.3, vDisplacement);
  
  vec3 finalColor = color + vec3(fresnel * 0.8) + vec3(peakGlow * 0.3);
  
  // Scanline/Noise texture effect (procedural)
  float scanline = sin(vUv.y * 100.0 + uTime * 5.0) * 0.05;
  
  gl_FragColor = vec4(finalColor + scanline, 1.0);
  
  // Tone mapping hack usually handled by Three.js if logic is in <shaderMaterial>, 
  // but we might want it to bloom, so we keep values > 1.0 potentially.
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
