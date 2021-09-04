const engine = require("../");

const w = 1280,
  h = 720;
const win = engine.createWindow("clock sample", w, h);
const can = win.getCanvas();
const ctx = can.getContext("2d");

let mouse = {
  x: 0,
  y: 0
};

win.resizable = true;
win.on("mousemove", eve => {
  mouse.x = eve.clientX;
  mouse.y = eve.clientY;
});

const win2 = engine.createWindow("clock sample", w, h);
const can2 = win2.getCanvas();
const ctx2 = can2.getContext("2d");

let mouse2 = {
  x: 0,
  y: 0
};

win2.resizable = true;
win2.on("mousemove", eve => {
  mouse2.x = eve.clientX;
  mouse2.y = eve.clientY;
});


function loop() {
  let gs = 0;
  if (!win.isDestroyed()) {
    let {
      w,
      h
    } = win.size;
    ctx.fillStyle = `rgb(${gs}, ${gs}, ${gs})`;
    ctx.fillRect(0, 0, w, h);

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "#000";
    ctx.arc(mouse.x, mouse.y, 100, 0, 44 / 7);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();

    win.render();
  }

  if (!win2.isDestroyed()) {
    let {
      w,
      h
    } = win2.size;
    ctx2.fillStyle = `rgb(${gs}, ${gs}, ${gs})`;
    ctx2.fillRect(0, 0, w, h);

    ctx2.beginPath();
    ctx2.fillStyle = "blue";
    ctx2.strokeStyle = "#000";
    ctx2.arc(mouse2.x, mouse2.y, 100, 0, 44 / 7);
    ctx2.fill();
    ctx2.stroke();
    ctx2.beginPath();

    win2.render();
  }

  setTimeout(loop, 1000 / 60);
}

loop();