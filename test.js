const engine=require("./");

const win=engine.createWindow();

const can=engine.createCanvas(1280, 720);

win.canvas=can;
const ctx=can.getContext("2d");

function radians(deg){
	return deg*(Math.PI/180);
}

function sin(deg){
	return Math.sin(radians(deg));
}

function cos(deg){
	return Math.cos(radians(deg));
}
ctx.translate(0, 720);
ctx.scale(1, -1);
let tor=0;
function loop(){
	// ctx.save();
	// ctx.resetTransform();
	// ctx.clearRect(0,0, 1280, 720);
	// ctx.restore();
	ctx.lineWidth=2;

	ctx.beginPath();
	ctx.moveTo(100, 100);
	ctx.lineTo(100, 200);
	ctx.stroke();
	// let tras= ctx.currentTransform;
	// ctx.resetTransform()
	// ctx.currentTransform = 
	ctx.rotate(radians(1));

	ctx.beginPath();
	ctx.moveTo(100, 100);
	ctx.lineTo(100, 200);
	ctx.stroke();

	win.render();
	tor+=5;
	tor%=360;
	// setTimeout(loop, 1000/30);
}
loop();