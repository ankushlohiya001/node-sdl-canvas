const document = require("../");
const createShader = require("./gl");
const window = document.window = document.createElement("window", {fps: 60});
let size = window.size;
const mouse = {x:0, y:0};

window.on("mousemove", (eve)=>{
  mouse.x = eve.clientX;
  mouse.y = eve.clientY;
});
//const can = document.createElement("canvas");
//const img = document.createElement("image"); 
//img.src = "../sams/scene.jpg";
//can.width = img.width;
//can.height = img.height;
//const ctx = can.getContext("2d");
//ctx.drawImage(img, 0, 0);
//const pixd = ctx.getImageData(0, 0, img.width, img.height).data;

const can2 = document.createElement("canvas");
document.appendChild(can2);
can2.width = size.w;
can2.height = size.h;
const gl = can2.getContext("3d");

const prog = createShader(gl, {vert: "./vert.shader", frag: "./frag.shader"});
gl.bindAttribLocation(prog, 0, "a_pos");
gl.bindAttribLocation(prog, 1, "a_cord");
gl.useProgram(prog);
//console.log(prog);

const umg = gl.getUniformLocation(prog, "u_image");

const pos = new Float32Array([
  -1, -1,  1, -1,
  -1, 1,  1, -1,
  -1, 1,  1, 1
]);
const posBuf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);

const cor = new Float32Array([
  0, 0,  1, 0,
  0, 1,  1, 0,
  0, 1,  1, 1
]);
const corBuf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, corBuf);
gl.bufferData(gl.ARRAY_BUFFER, cor, gl.STATIC_DRAW);

const tex = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, tex);

gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

const can = document.createElement("canvas", {width: size.w, height: size.h});
const ctx = can.getContext("2d");

function draw(){
  ctx.fillStyle = "#fff2";
  ctx.fillRect(0, 0, size.w, size.h);
  
  ctx.fillStyle = "#000";
  ctx.fillRect(mouse.x-50, mouse.y-50, 100, 100);
}

(function loop(){
  window.requestAnimationFrame(loop);
  draw();
  const pixd = ctx.getImageData(0, 0, size.w, size.h).data;
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size.w, size.h, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixd);

  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, corBuf);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

  gl.clearColor(0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, 6);


  window.render();
})();
