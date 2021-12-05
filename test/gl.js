const fs = require("fs");
const Matrix = require("../../nodeP5/math/matrix");
const Color = require("../../nodeP5/color");
const {createCanvas, loadImage} = require("canvas");

function loadShader(gl, type, src){
  const shader = gl.createShader(type);
  const dat = fs.readFileSync(src);
  gl.shaderSource(shader, ""+dat);
  gl.compileShader(shader);
  return shader;
}

function createShader(gl, {vert, frag}={}){
  const vt = loadShader(gl, gl.VERTEX_SHADER, vert);
  const fg = loadShader(gl, gl.FRAGMENT_SHADER, frag);
  const prog = gl.createProgram();
  gl.attachShader(prog, vt);
  gl.attachShader(prog, fg);
  gl.linkProgram(prog);
  return prog;
}

function createVertexArray(gl, cb){
  const vao = gl.createVertexArrayOES();
  gl.bindVertexArrayOES(vao);
  cb();
  gl.bindVertexArrayOES(null);
  return vao;
}

class TransformMatrix{
  constructor(){
    this.resetTransform();
  }

  setTransform(mat){
    this.matrix = mat;
  }

  resetTransform(){
    this.matrix = Matrix.newIdentity(4);
  }

  transform(mat){
    this.matrix = Matrix.mult(mat, this.matrix);
  }

  translate(px, py, pz){
    // TODO gen a matrix
  }
}

class Shape{

  static genCommonShader(gl){
    return createShader(gl, {vert: "./vert.shader", frag: "./frag.shader"});
  }

  static init(gl, shader = null){
    Shape.gl = gl;
    Shape.commonShader = shader || Shape.genCommonShader(gl);
    Shape.initLocations();
  }

  static initLocations(){
    const gl = Shape.gl;
    Shape.posAttribute = gl.getAttribLocation(Shape.commonShader, "a_pos"); // position attribute location
    Shape.ctrMatUniform = gl.getUniformLocation(Shape.commonShader, "u_ctrmat"); //current transform matrix uniform Location
    Shape.trMatUniform = gl.getUniformLocation(Shape.commonShader, "u_trmat"); // transform matrix to be applied uniform Location
    Shape.resUniform = gl.getUniformLocation(Shape.commonShader, "u_res"); // resolution setup fixing aspect issues Location
  }

  static usingBuffer(buf, cb){
    const gl = Shape.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    cb();
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  constructor(data){
    const gl = Shape.gl;
    this.buffer = gl.createBuffer();
    this.updateData(data);
    this.ctrMatrix = Matrix.newIdentity(4);
    this.trMatrix = Matrix.newIdentity(4);
    this.dim = 2;
    this.material = new Material(255);
  }

  updateData(data){
    const gl = Shape.gl;
    this.geo = new Float32Array(data);
    Shape.usingBuffer(this.buffer, ()=>{
      gl.bufferData(gl.ARRAY_BUFFER, this.geo, gl.STATIC_DRAW);
    });
  }

  setTransform(mat){
    this.ctrMatrix = mat;
  }

  transform(mat){
    this.trMatrix = mat;
  }

  translate(px, py, pz = 0){
    const mat = Matrix.newIdentity(4);
    mat.set(3, 0, px);
    mat.set(3, 1, py);
    mat.set(3, 2, pz);
    this.setTransform(mat);
  }

  updateUniforms(gl){
    const size = [gl.canvas.width, gl.canvas.height];
    gl.viewport(0, 0, ...size);

    gl.uniform2f(Shape.resUniform, ...size);
    gl.uniformMatrix4fv(Shape.ctrMatUniform, false, this.ctrMatrix.array);
    gl.uniformMatrix4fv(Shape.trMatUniform, false, this.trMatrix.array);
  }

  draw(){
    const gl = Shape.gl;

    gl.useProgram(Shape.commonShader);

    this.updateUniforms(gl);
    this.material.fill();

    gl.enableVertexAttribArray(Shape.posAttribute);
    Shape.usingBuffer(this.buffer, ()=>{
      gl.vertexAttribPointer(Shape.posAttribute, this.dim, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, this.geo.length / this.dim);
    });

    gl.useProgram(null);
  }

}

Shape.Plane = function(wid, hei, px = 0, py = 0){
  wid *= 0.5; hei *= 0.5;
  return [px - wid, py - hei, px + wid, py - hei,
            px - wid, py + hei, px - wid, py + hei,
            px + wid, py - hei, px + wid, py + hei];
}

class Material{
  static init(gl, shader = null){
    Material.gl = gl;
    if(shader == null){
      if(Shape.shader == null) Shape.init(gl);
      shader = Shape.shader;
    }
    Material.shader = shader;
    Material.initLocations(gl);
  }

  static initLocations(gl){
    Material.colUniform = gl.getUniformLocation(Material.shader, "u_color");
  }

  constructor(...pars){
    this.color = Color.color(null, ...pars);
  }

  fill(){
    let [r, g, b] = this.color.value;
    const gl = Material.gl;
    gl.uniform4f(Material.colUniform, r/255, g/255, b/255, this.color.alpha);
  }
}

class Texture{
  static init(gl){
    Texture.gl = gl;
    Texture.initLocations(gl);
  }

  static initLocations(gl){
    Texture.texAttrib = gl.getAttribLocation(Shape.shader, "a_texC");
  }

  static usingTexture(tex, cb){
    const gl = Texture.gl;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    cb();
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  constructor(){
    const gl = Texture.gl;
    this.size = [0, 0];
    this.cords = gl.createBuffer();
    this.texture = gl.createTexture();
    this.pixels = null;
    this.setParams();
  }

  setParams(){
    const gl = Texture.gl;
    Texture.usingTexture(this.texture, ()=>{
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    });
  }

  async loadTexture(src, after){
    const img = await loadImage(src);
    const size = this.size = [img.width, img.height];
    const ctx = createCanvas(...size).getContext("2d");
    ctx.drawImage(img, 0, 0);
    this.pixels = ctx.getImageData(0, 0, ...size).data;
    if(typeof after == "function") after();
  }

  updateData(pixels){
    const gl = Texture.gl;
    pixels = pixels || this.pixels;
    if(pixels == null){
      console.warn(`texture not loaded`);
      return;
    }
    Texture.usingTexture(this.texture, ()=>{
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, ...this.size, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    })
  }
}

function initAll(gl){
  Shape.init(gl);
  Material.init(gl);
  Texture.init(gl);
}
module.exports = {
  Shape,
  Material,
  Texture,
  initAll,
  createShader,
  createVertexArray
};
