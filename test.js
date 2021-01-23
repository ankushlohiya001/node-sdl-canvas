const engine=require("./");

const win=engine.createWindow();

win.setCursor("Wait");
win.on("click",()=>{
	win.confirm("pacman");
})