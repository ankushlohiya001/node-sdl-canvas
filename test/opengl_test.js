const engine = require("../");
let w = 1280,
  h = 720;

const isize = [1280, 720];
const win = engine.createWindow("clock sample", w, h);
const gl = win.createGLContext();

win.resizable = true;

// gl.Enable(gl.BLEND);
// gl.BlendFunc(gl.ONE, gl.SRC_COLOR);
// gl.Disable(gl.NORMALIZE);
// gl.MatrixMode(gl.PROJECTION);
// gl.MatrixMode(gl.MODELVIEW);

// gl.Ortho(-10.0, -10.0, 10.0, 10.0, 100.0, -1.0);
// gl.Scaled(2.0, 2.0, 1.0);
// console.log(fl);
const mouse = {
  x: 0,
  y: 0
};

win.on("mousemove", eve => {
  mouse.x = (eve.clientX * 2) / w - 1;
  mouse.y = ((h - eve.clientY) * 2) / h - 1;
});

win.on("resize", eve => {
  const size = win.size;
  w = size.w;
  h = size.h;
})

function radians(deg) {
  return deg * (Math.PI / 180);
}

let ang = 0;
async function loop() {
  ang %= 360;
  const {
    w,
    h
  } = win.size;

  const ar = w / h;

  gl.PushMatrix();

  gl.ClearColor(0.0, 0.0, 0.0, 1.0);
  gl.Clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.Translatef(0.0, 0.0, mouse.x);
  gl.Rotatef(ang += 0.1, 1.0, 0.5, 0.0);

  gl.LineWidth(4);

  gl.Begin(gl.LINE_LOOP);
  gl.Color3f(0.0, 1.0, 0.0);
  gl.Vertex3f(-0.5, -0.5, -0.5);
  gl.Vertex3f(0.5, -0.5, -0.5);
  gl.Vertex3f(0.5, 0.5, -0.5);
  gl.Vertex3f(-0.5, 0.5, -0.5);
  gl.End();

  gl.Begin(gl.LINE_LOOP);
  gl.Color3f(1.0, 0.0, 0.0);
  gl.Vertex3f(-0.5, -0.5, 0.5);
  gl.Vertex3f(0.5, -0.5, 0.5);
  gl.Vertex3f(0.5, 0.5, 0.5);
  gl.Vertex3f(-0.5, 0.5, 0.5);
  gl.End();

  gl.Begin(gl.LINES);
  gl.Color3f(0, 0, 1.0);
  gl.Vertex3f(-0.5, 0.5, -0.5);
  gl.Vertex3f(-0.5, 0.5, 0.5);
  gl.Vertex3f(-0.5, -0.5, -0.5);
  gl.Vertex3f(-0.5, -0.5, 0.5);
  gl.Vertex3f(0.5, 0.5, -0.5);
  gl.Vertex3f(0.5, 0.5, 0.5);
  gl.Vertex3f(0.5, -0.5, -0.5);
  gl.Vertex3f(0.5, -0.5, 0.5);
  gl.End();

  gl.PopMatrix();
  await win.swap();
  setTimeout(loop, 17);
}


loop();