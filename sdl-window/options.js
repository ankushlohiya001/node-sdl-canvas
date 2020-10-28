const sdl=require("./../sdl");
const windowOpts=()=>({
  title: 'node-sdl-canvas',
  width: 1280,
  height: 720,
  x: 0x2FFF0000,
  y: 0x2FFF0000,
  closable: true,
  fullScreen: false,
  show: true,
  resizable: true,
  borderless: false,
  minimized: false,
  allowHighDPI: false,
  grabInputFocus: false
});
function getWindowOpts(options={}) {
    let defaults = windowOpts();
    let opts = Object.assign({}, defaults, options);
    /*tslint:disable*/
    let flags = 0;
    flags |= sdl.SDL_WindowFlags.SDL_WINDOW_OPENGL;
    flags |= opts.fullscreen ? sdl.SDL_WindowFlags.SDL_WINDOW_FULLSCREEN_DESKTOP : 0;
    flags |= opts.show ? sdl.SDL_WindowFlags.SDL_WINDOW_SHOWN : sdl.SDL_WindowFlags.SDL_WINDOW_HIDDEN;
    flags |= opts.resizable ? sdl.SDL_WindowFlags.SDL_WINDOW_RESIZABLE : 0;
    flags |= opts.borderless ? sdl.SDL_WindowFlags.SDL_WINDOW_BORDERLESS : 0;
    flags |= opts.minimized ? sdl.SDL_WindowFlags.SDL_WINDOW_MINIMIZED : 0;
    flags |= opts.maximized ? sdl.SDL_WindowFlags.SDL_WINDOW_MAXIMIZED : 0;
    flags |= opts.allowHighDPI ? sdl.SDL_WindowFlags.SDL_WINDOW_ALLOW_HIGHDPI : 0;
    flags |= opts.grabInputFocus ? sdl.SDL_WindowFlags.SDL_WINDOW_INPUT_GRABBED : 0;
    /*tslint:enable*/
    return {
      x: opts.x,
      y: opts.y,
      w: opts.width,
      h: opts.height,
      flags,
      title: opts.title
    };
}

module.exports={windowOpts,getWindowOpts};