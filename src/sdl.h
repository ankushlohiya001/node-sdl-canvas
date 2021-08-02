#ifndef _NodeSdl_Sdl_H_
#define _NodeSdl_Sdl_H_

#include <napi.h>
#include <SDL.h>

namespace SdlMain{

  Napi::Value initSome(const Napi::CallbackInfo& info);
  Napi::Value initSubSystem(const Napi::CallbackInfo& info);
  void quitSubSystem(const Napi::CallbackInfo& info);
  Napi::Value wasInit(const Napi::CallbackInfo& info);
  void quit(const Napi::CallbackInfo& info);
}

#endif // _NodeSdl_Sdl_H_