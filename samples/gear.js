const engine = require("./../");
engine.mainLoop();
const win = engine.createWindow();
const canvas = engine.createCanvas(1280, 720);
win.canvas = canvas;
const ctx = canvas.getContext("2d");

function radians(deg) {
  return deg * (Math.PI / 180);
}
let angle = 0;
let length = 0;
const max = 320;

let done = false;

async function loop(ang = 0, len = 0) {
  // ang%=30;
  done = false;
  if (len > max) len = max;
  if (len < 0) len = 0;
  const rh = 125 + len;
  const lh = 125 + (max - len);
  ctx.save();
  // ctx.resetTransform();
  ctx.scale(1.5, 1.5);
  ctx.fillStyle = "skyblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "36px inter";
  ctx.fillStyle = "teal";
  ctx.fillText("node-sdl-canvas", 310, len - 200);
  ctx.fillStyle = "tomato";
  ctx.fillRect(0, len, canvas.width, canvas.height);
  ctx.lineWidth = 4;
  ctx.moveTo(450, len - 185);
  ctx.lineTo(450, len);
  ctx.moveTo(300, len - 185);
  ctx.lineTo(600, len - 185);
  ctx.stroke();
  ctx.beginPath();
  ctx.save();
  // ctx.beginPath();
  ctx.fillStyle = "lightgreen";
  ctx.fillRect(215, 115, 20, 600);
  ctx.fillRect(0, 500, 600, 20);
  ctx.fillRect(590, 170, 20, 350);
  ctx.fillRect(540, 240, 50, 20);
  ctx.fillRect(50, 450, 20, 50);
  ctx.translate(215, 115);
  ctx.restore();
  ctx.save();
  ctx.lineWidth = 1;
  ctx.translate(225, 125);
  ctx.rotate(radians(ang));
  ctx.arc(0, 0, 25, 0, 44 / 7);
  // ctx.fillStyle="#000";
  ctx.lineTo(0, 0);
  ctx.stroke();
  // ctx.strokeRect(-10,-5, 150, 10);
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, 44 / 7);
  ctx.fillStyle = "seagreen";
  ctx.fill();
  // ctx.beginPath();
  ctx.lineWidth = 3;
  for (let sp = 0; sp < 360; sp += 40) {
    let slop = [Math.cos(radians(sp)), Math.sin(radians(sp))];
    ctx.moveTo(slop[0] * 20, slop[1] * 20);
    ctx.lineTo(slop[0] * 28, slop[1] * 28);
  }
  ctx.stroke();
  ctx.restore();
  ctx.save();
  ctx.beginPath();
  ctx.translate(550, 250);
  ctx.lineWidth = 4;
  // ctx.moveTo(-500,-90);
  ctx.arc(0, 0, 25, -Math.PI / 3, Math.PI / 3);
  ctx.stroke();
  ctx.rotate(radians(ang));
  // ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, 25, 0, 44 / 7);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = 3;
  for (let sp = 0; sp < 360; sp += 40) {
    let slop = [Math.cos(radians(sp)), Math.sin(radians(sp))];
    ctx.moveTo(slop[0] * 20, slop[1] * 20);
    ctx.lineTo(slop[0] * 28, slop[1] * 28);
  }
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.translate(60, 460);
  ctx.lineWidth = 4;
  // ctx.moveTo(-500,-90);
  ctx.arc(0, 0, 25, Math.PI / 3, Math.PI);
  ctx.stroke();
  ctx.rotate(radians(ang));
  // ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, 25, 0, 44 / 7);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = 3;
  for (let sp = 0; sp < 360; sp += 40) {
    let slop = [Math.cos(radians(sp)), Math.sin(radians(sp))];
    ctx.moveTo(slop[0] * 20, slop[1] * 20);
    ctx.lineTo(slop[0] * 28, slop[1] * 28);
  }
  ctx.stroke();
  ctx.restore();
  ctx.beginPath();
  // ctx.lineWidth=4;
  ctx.lineCap = "round";
  ctx.moveTo(250, 125);
  ctx.lineTo(250, rh);
  ctx.lineJoin = "round";
  ctx.arc(250, rh, 10, 0, 44 / 7);
  ctx.stroke();
  ctx.moveTo(100, rh);
  ctx.lineTo(400, rh);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(225, 125, 25, 22 / 7, 0);
  ctx.stroke();
  ctx.moveTo(200, 125);
  ctx.lineTo(200, lh);
  ctx.stroke();
  ctx.save();
  ctx.translate(175 + 25, lh);
  ctx.rotate(radians(ang * 0.125));
  ctx.fillStyle = "seagreen";
  ctx.fillRect(-25, -25, 50, 50);
  ctx.restore();
  ctx.save();
  ctx.lineWidth = 1;
  ctx.translate(600, 400);
  ctx.rotate(radians(180 + ang * 0.125));
  ctx.fillStyle = "brown";
  ctx.fillRect(-20, -20, 600, 40);
  ctx.save();
  ctx.translate(550, -20);
  ctx.rotate(radians(ang * 0.157));
  ctx.fillStyle = "lightgreen";
  ctx.fillRect(0, 0, 20, 440);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "dodgerblue";
  ctx.strokeRect(-74, 140, 70, 295);
  ctx.restore();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, 5, 0, 44 / 7);
  // ctx.closePath();
  // ctx.fillStyle="#000";
  ctx.stroke();
  ctx.restore();
  // ctx.beginPath();
  ctx.restore();
  ctx.beginPath();

  await win.render();
  done = true;
  // setTimeout(()=>{
  // loop(angle, length);
  // },1000/30);
}
loop();

win.on("resize", () => {
  if(done) loop();
});

function changeEve(delta) {
  let test = length + delta;
  if (test < 0 || test > max) return;
  loop(angle += delta, length += delta);
}
let i = 0;

win.on("wheel", (eve) => {
  changeEve(eve.delta * 20);
});

win.on("click", () => {})