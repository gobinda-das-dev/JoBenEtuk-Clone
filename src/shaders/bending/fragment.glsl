uniform sampler2D uTexture;
uniform vec2 uTextureSize;
uniform vec2 uQuadSize;

varying vec2 vUv;

#include ../utils/cover.glsl
#include ../utils/noise.glsl

void main() {
  vec2 coverUv = getCoverUvFrag(vUv, uTextureSize, uQuadSize);
  vec4 color = texture2D(uTexture, vUv);

  gl_FragColor = vec4(color);
}
