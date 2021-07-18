const engine = require("../");
const sdl = require("../../node-sdl");
const canvas = require("canvas");
const perf = require("perf_hooks").performance;
engine.mainLoop();
const eventWatcher= require("../events");

function main(title) {
  const win = engine.createWindow("helo", 1280, 720);
  win.resizable = true;
  const can = engine.createCanvas();
  win.canvas = can;
  win.devicePixelRatio = 0.5;
  const ctx = can.getContext("2d");
  const mouse = {
    x: 0,
    y: 0
  };

  win.on("mousemove", (eve) => {
    mouse.x = eve.clientX;
    mouse.y = eve.clientY;
    if(done) loop();
  });

  let lop = true;


  let done=true;
  async function loop() {
    // eventWatcher.eventPolling();
    // console.log(win.size, win.context.size, [can.width, can.height]);
    done=false;
    ctx.save();
    ctx.scale(.5, .5);
    const bef = perf.now();
    ctx.fillStyle = "#fff8";
    ctx.fillRect(0, 0, can.width*(1/.5), can.height*(1/.5));

    ctx.beginPath();
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 10;
    ctx.arc(mouse.x, mouse.y, 100, 0, 44 / 7);
    ctx.stroke();
    await win.render();

    const latency = perf.now() - bef;
    const delay = Math.max(17 - latency, 0);

    ctx.restore();

    done = true;
    // if (lop) setTimeout(loop, delay);

  }
  loop();
}

main(`window: #1`);