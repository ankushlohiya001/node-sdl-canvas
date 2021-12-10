precision mediump float;

uniform vec4 u_color;
uniform sampler2D u_img;

varying vec4 v_pos;

void main() {
  //gl_FragColor = texture2D(u_img, v_pos.xy);
  gl_FragColor = u_color;
}
