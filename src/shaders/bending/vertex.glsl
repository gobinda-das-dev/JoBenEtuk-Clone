#define PI 3.141592653589793

uniform float uScrollVelocity;

varying vec2 vUv;

vec3 deformationCurve(vec3 position, vec2 uv) {
  position.y = position.y - (sin(uv.x * PI) * uScrollVelocity * -0.002);
  
  return position;
}

void main() {
  vec3 newPosition = position;
  newPosition = deformationCurve(newPosition, uv);
  

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);

  // Varyings
  vUv = uv;
}
