precision mediump float;
uniform sampler2D u_image;
varying vec2 v_col;

void main() {
  vec4 pxs = texture2D(u_image, v_col);
  vec3 mp = pxs.xyz;
  gl_FragColor = vec4(mp.xyz, 0); 
}
