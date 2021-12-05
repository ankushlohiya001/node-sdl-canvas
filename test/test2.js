const document = require("../");
const fs = require("fs");

const win = document.window = document.createElement("window", {opengl: true, resizable: true});
let can = document.createElement("canvas");
document.appendChild(can);

let gl = can.getContext("3d");
win.onresize = function(){
  const size = win.size;
  can.width = size.w;
  can.height = size.h;
}

function createShader(type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

const vertS = `
attribute vec2 a_position;
uniform vec2 resolution;
void main(){
  vec2 tmp = a_position/resolution;
  tmp = tmp * 2.0 - 1.0;
  gl_Position = vec4(tmp, 0, 0);
}
`; 
const fragS = `
precision mediump float;
uniform vec4 color;
void main(){
  gl_FragColor = color;
}
`;

function main() {
  // Get A WebGL context

  // create GLSL shaders, upload the GLSL source, compile the shaders
  var vertexShader = createShader( gl.VERTEX_SHADER, vertS);
  var fragmentShader = createShader( gl.FRAGMENT_SHADER, fragS);

  // Link the two shaders into a program
  var program = createProgram( vertexShader, fragmentShader);

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var res = gl.getUniformLocation(program, "resolution");
  var col = gl.getUniformLocation(program, "color");

  // Create a buffer and put three 2d clip space points in it
  var positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var positions = [
    640, 360
  ];
  for(let i = 0; i <= 360; i+=6){
    positions.push(640 + Math.cos(i*Math.PI/180) * 200, 360 + Math.sin(i*Math.PI/180) * 200);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // code above this line is initialization code.
  // code below this line is rendering code.
  (function loop(){
    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    const size = win.size;
    gl.uniform2f(res, size.w, size.h);

    gl.uniform4f(col, Math.random(), Math.random(), Math.random(), 1.0);
    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, !1, 0, 0);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, positions.length / 2);

    win.render();

    setTimeout(loop, 1000);
  })();
}

main();
