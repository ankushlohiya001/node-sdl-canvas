const sdl=require("./../sdl");
const ref=require("ref-napi");

function createPopup(type, message, win){
	const infoPopupData=sdl.SDL_Create_MessageBoxButtonData([]);
	const alertPopupData=sdl.SDL_Create_MessageBoxButtonData([{type:"yes", text:"Ok"}]);
	const confirmPopupData=sdl.SDL_Create_MessageBoxButtonData([{type:"yes", text:"Ok"}, {type:"cancel", text:"Cancel"}]);
	
	let btnData=infoPopupData;
	let btnLen=0;
	if(type==="alert"){
		btnData=alertPopupData;
		btnLen=1;
	}
	else if(type==="confirm"){
		btnData=confirmPopupData;
		btnLen=2;
	}
	return sdl.SDL_ShowMessageBox("info",type,message,btnData, btnLen, win)===0;
}


module.exports=createPopup;