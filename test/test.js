const sdl = require("./lib/binding");

const canvas = require("canvas");

const [wid, hei] = [1280, 720];

const can = canvas.createCanvas(wid, hei);
const ctx = can.getContext("2d");

// console.log(sdl);
// sdl.init(sdl.init_flags.INIT_EVERYTHING);

const window = new sdl.Window("pacman");

const renderer = new sdl.Renderer(window);

const texture = new sdl.Texture(renderer, wid, hei);

const watcher = new sdl.EventWatcher();

let will = true;

let count = 0;

(function loop() {

  watcher.pollEvent();

  const mouse = watcher.mouseEvent;

  // let arr = new Int8Array(2);
  // arr[0] = mouse.x;
  // arr[1] = mouse.y;

  // window.position = [];
  count++;

  will = watcher.commonEvent.type != 0x100;

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, wid, hei);
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(mouse.x, mouse.y, count % 20 + 20, 0, 44 / 7);
  ctx.fill();

  texture.update(can.toBuffer("raw"));
  renderer.render(texture);

  if (will) setTimeout(loop, 17);
  else destroy();
})();

// console.log(window.size);

// let will = true;
// let frames = 0;

// (function loop() {
//   const pos = window.position;
//   window.title = `pos: ${pos[0]}, ${pos[1]}`;
//   if (will) setTimeout(loop, 100);
// })();
// let renderer = window.createRenderer();

function destroy() {
  texture.destroy();
  renderer.destroy();
  window.destroy();
  sdl.quit();
}