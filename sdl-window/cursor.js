const sdl=require("./../sdl");
const typeMap={
	'arrow': sdl.SDL_SystemCursor.SDL_SYSTEM_CURSOR_ARROW,
	'i-beam': sdl.SDL_SystemCursor.SDL_SYSTEM_CURSOR_IBEAM,
	'wait': sdl.SDL_SystemCursor.SDL_SYSTEM_CURSOR_WAIT,
	'crosshair': sdl.SDL_SystemCursor.SDL_SYSTEM_CURSOR_CROSSHAIR,
	'waitarrow': sdl.SDL_SystemCursor.SDL_SYSTEM_CURSOR_WAITARROW,
	'move': sdl.SDL_SystemCursor.SDL_SYSTEM_CURSOR_SIZEALL,
	'hand': sdl.SDL_SystemCursor.SDL_SYSTEM_CURSOR_HAND,
	'no': sdl.SDL_SystemCursor.SDL_SYSTEM_CURSOR_NO,
	'horizontal': sdl.SDL_SystemCursor.SDL_SYSTEM_CURSOR_SIZEWE,
	'vertical': sdl.SDL_SystemCursor.SDL_SYSTEM_CURSOR_SIZENS,
	'rightbend': sdl.SDL_SystemCursor.SDL_SYSTEM_CURSOR_SIZENESW,
	'leftbend': sdl.SDL_SystemCursor.SDL_SYSTEM_CURSOR_SIZENWSE,
};
function setCursorType(type){
	type=type.toLowerCase();
	const cursor=sdl.SDL_CreateSystemCursor(typeMap[type] || typeMap['arrow']);
	sdl.SDL_SetCursor(cursor);
}

module.exports=setCursorType;