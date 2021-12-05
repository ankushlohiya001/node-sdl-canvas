attribute vec4 a_pos;
attribute vec4 a_cord;
varying vec2 v_col;

void main() {
  v_col = a_cord.xy;
  vec2 md = a_pos.xy * vec2(1, -1);
  gl_Position = vec4(md.xy, 0, a_pos.w);
}
