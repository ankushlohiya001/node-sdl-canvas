const engine = require("../");
const sdl = require("../../node-sdl");
const canvas = require("canvas");
const perf = require("perf_hooks").performance;
engine.mainLoop();

function main(title) {
  const win = engine.createWindow("helo", 1280, 720);
  // win.devicePixelRatio = 3.0;
  win.resizable = true;
  const can = engine.createCanvas();
  win.canvas = can;
  const ctx = can.getContext("2d");
  const mouse = {
    x: 0,
    y: 0
  };

  win.on("mousemove", eve => {
    mouse.x = eve.clientX;
    mouse.y = eve.clientY;
  });

  let lop = true;


  function loop() {
    // console.log(win.size, win.context.size, [can.width, can.height]);
    ctx.save();
    const bef = perf.now();
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, can.width, can.height);

    ctx.beginPath();
    ctx.strokeStyle = "#2f4";
    ctx.arc(mouse.x, mouse.y, 200, 0, 44 / 7);
    ctx.stroke();
    win.render();

    const latency = perf.now() - bef;
    const delay = Math.max(17 - latency, 0);

    ctx.restore();

    if (lop) setTimeout(loop, delay);

  }
  loop();
}

main(`window: #1`);