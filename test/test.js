const document = require("../");
const {Shape, Material, Texture, initAll} = require("./gl");
const window = document.window = document.createElement("window", {
  fps: 60,
  resizable: true
});
let size = window.size;
const mouse = {x:0, y:0};

const can2 = document.createElement("canvas", {width: size.w, height: size.h});
document.appendChild(can2);
const gl = can2.getContext("3d");

initAll(gl);

window.on("mousemove", (eve)=>{
  mouse.x = eve.clientX;
  mouse.y = eve.clientY;
});

window.on("resize", eve=>{
  const size = window.size;
  can2.width = size.w;
  can2.height = size.h;
  gl.viewport(0, 0, size.w, size.h);
});

window.on("click", ()=>{
  const dat = Shape.Plane(50, 100, mouse.x, mouse.y);
  shps.updateData([...shps.geo, ...dat]);
});

const shape = new Shape(Shape.Plane(50, 100));
const shps = new Shape([]);
const tex = new Texture();
const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  0, 0, 0, 1, 1, 0,
]), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

function setup(){
  gl.useProgram(Shape.commonShader);
}

function draw(){
  const size = window.size;
  gl.bindTexture(gl.TEXTURE_2D, tex.texture);
  const loc = gl.getAttribLocation(Shape.commonShader, "a_texC");
  gl.enableVertexAttribArray(loc);
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  shps.draw();
  shape.translate(mouse.x, mouse.y);
  shape.draw();
}

setup();
(function loop(){
  window.requestAnimationFrame(loop);
  gl.clearColor(1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  draw();

  window.render();
})();

