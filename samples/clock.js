const engine = require("./../");
engine.mainLoop();
const win = engine.createWindow(
  "clock sample",
  1280,
  720
);
let {
  w,
  h
} = win.size;
const can = engine.createCanvas();
win.canvas = can;

const ctx = can.getContext("2d");

function radians(deg) {
  return deg * (Math.PI / 180);
}

function getLoc(i) {
  i -= 90;
  return [Math.cos(radians(i)), Math.sin(radians(i))];
}

function dial(w, h) {
  let rad = Math.min(w, h) / 2;
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#bbb";
  ctx.beginPath();
  return rad;
}

function indic(w, h, rad) {
  ctx.beginPath();
  let inc = 0;
  for (let i = 0; i < 360; i += 6) {
    let loc = [Math.cos(radians(i)), Math.sin(radians(i))];
    if (i % 30 === 0) {
      inc = 0.05;
    } else {
      inc = 0;
    }
    ctx.moveTo(w / 2 + loc[0] * rad * (0.85 - inc), h / 2 + loc[1] * rad * (0.85 - inc));
    ctx.lineTo(w / 2 + loc[0] * rad * 0.9, h / 2 + loc[1] * rad * 0.9);
  }
  ctx.stroke();
  ctx.beginPath();
}

function hands(w, h, rad) {
  const time = new Date();
  const sep = [];
  let loc = [0, 0];
  sep.push(time.getHours());
  sep.push(time.getMinutes());
  sep.push(time.getSeconds());

  // let loc=;
  //hour
  ctx.beginPath();
  loc = getLoc((sep[0] / 12) * 360 + (sep[1] / 2));
  ctx.lineWidth = 10;
  ctx.moveTo(w / 2, h / 2);
  ctx.lineTo(w / 2 + loc[0] * rad * 0.4, h / 2 + loc[1] * rad * 0.4);
  ctx.stroke();
  //minute
  ctx.beginPath();
  ctx.lineWidth = 6;
  loc = getLoc((sep[1] / 60) * 360 + (sep[2] / 10));
  ctx.moveTo(w / 2, h / 2);
  ctx.lineTo(w / 2 + loc[0] * rad * 0.5, h / 2 + loc[1] * rad * 0.5);
  ctx.stroke();
  //second
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#f42";
  loc = getLoc((sep[2] / 60) * 360);
  ctx.moveTo(w / 2 - loc[0] * rad * 0.1, h / 2 - loc[1] * rad * 0.1);
  ctx.lineTo(w / 2 + loc[0] * rad * 0.7, h / 2 + loc[1] * rad * 0.7);
  ctx.stroke();

  // ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = "#f42b";
  ctx.arc(w / 2, h / 2, 15, 0, 44 / 7);
  ctx.fill();
  // ctx.beginPath();
  // let pos = ctx.measureText(`${sep[0]} : ${sep[1]} : ${sep[2]}`).width;
  // ctx.fillStyle = "#24f8";
  // ctx.fillRect(w / 2 - pos / 2 - 10, h / 2 + 50, pos + 20, 70);
  // ctx.beginPath();
  // ctx.font = `50px inter`;
  // ctx.fillStyle = "#bbb";
  // ctx.fillText(`${sep[0]} : ${sep[1]} : ${sep[2]}`,
  //   w / 2 - ctx.measureText(`${sep[0]} : ${sep[1]} : ${sep[2]}`).width / 2, h / 2 + 100);
  ctx.beginPath();
}

function loop() {
  const [w, h] = win.size;

  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, w, h);
  const rad = dial(w, h);
  indic(w, h, rad);
  hands(w, h, rad);
  win.render();
  setTimeout(loop, 1000);
}

loop();