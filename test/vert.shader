attribute vec4 a_pos;
attribute vec4 a_texC;

uniform mat4 u_ctrmat;
uniform mat4 u_trmat;
uniform vec2 u_res;

varying vec4 v_pos;

void main() {
  mat4 n_mat = mat4(2.0/u_res.x, 0, 0, 0,
                    0, -2.0/u_res.y, 0, 0,
                    0, 0, 1, 0,
                    -1, 1, 0, 1);
  vec4 a_mat_tr = n_mat * u_trmat * u_ctrmat * a_pos;
  v_pos = a_texC;
  gl_Position = a_mat_tr; 
}
