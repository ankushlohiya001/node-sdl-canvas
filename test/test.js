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
const gl = can2.getContext("webgl");

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

const shape = new Shape(Shape.Plane(50, 80));

function setup(){
  gl.useProgram(Shape.commonShader);

}

function draw(){
  const size = window.size;
  const u_col = gl.getUniformLocation(Shape.commonShader, "u_color");
  gl.uniform4f(u_col, 0.5, 1.0, 0.0, 1.0);
  shape.translate(mouse.x, mouse.y);
  shape.draw();

  gl.uniform4f(u_col, 1.0, 1.0, 1.0, 1.0);
  shape.translate(mouse.x+10, mouse.y-10);
  shape.draw(gl.LINES);
}

setup();
(function loop(){
  window.requestAnimationFrame(loop);
  gl.clearColor(0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  draw();

  window.render();
})();

