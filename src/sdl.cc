#include "sdl.h"
#include "video.h"
#include "render.h"
#include "events.h"
#include "opengl.h"

Napi::Value SdlMain::initSome(const Napi::CallbackInfo& info){
	Napi::Env env = info.Env();
	int flags = 0;
	if(info.Length() > 0){
		if(info[0].IsNumber()){
			flags = info[0].As<Napi::Number>();
		}
	}else{
		Napi::TypeError::New(env, "init flags c").ThrowAsJavaScriptException();
		return env.Null();
	}
	// native api call;
	int res = SDL_Init(flags);
	return Napi::Number::New(env, res);
}

Napi::Value SdlMain::initSubSystem(const Napi::CallbackInfo& info){
	Napi::Env env = info.Env();
	int flags = 0;
	if(info.Length() > 0){
		if(info[0].IsNumber()){
			flags = info[0].As<Napi::Number>();
		}
	}else{
		Napi::TypeError::New(env, "init flags c").ThrowAsJavaScriptException();
		return env.Null();
	}
	// native api call;
	int res = SDL_InitSubSystem(flags);
	return Napi::Number::New(env, res);
}

void SdlMain::quitSubSystem(const Napi::CallbackInfo& info){
	Napi::Env env = info.Env();
	int flags = 0;
	if(info.Length() > 0){
		if(info[0].IsNumber()){
			flags = info[0].As<Napi::Number>();
		}
	}else{
		Napi::TypeError::New(env, "init flags c").ThrowAsJavaScriptException();
		return;
	}
	// native api call;
	SDL_QuitSubSystem(flags);
}

Napi::Value SdlMain::wasInit(const Napi::CallbackInfo& info){
	Napi::Env env = info.Env();
	int flags = 0;
	if(info.Length() > 0){
		if(info[0].IsNumber()){
			flags = info[0].As<Napi::Number>();
		}
	}else{
		Napi::TypeError::New(env, "init flags c").ThrowAsJavaScriptException();
		return env.Null();
	}
	// native api call;
	int res = SDL_WasInit(flags);
	return Napi::Number::New(env, res);
}

void SdlMain::quit(const Napi::CallbackInfo& info){
	// native api call;
	SDL_Quit();
}

Napi::Object Init(Napi::Env env, Napi::Object exports){
	exports.Set(Napi::String::New(env, "init"), Napi::Function::New(env, SdlMain::initSome));
	exports.Set(Napi::String::New(env, "initSubSystem"), Napi::Function::New(env, SdlMain::initSubSystem));
	exports.Set(Napi::String::New(env, "quitSubSystem"), Napi::Function::New(env, SdlMain::quitSubSystem));
	exports.Set(Napi::String::New(env, "wasInit"), Napi::Function::New(env, SdlMain::wasInit));
	exports.Set(Napi::String::New(env, "quit"), Napi::Function::New(env, SdlMain::quit));

	Video::Init(env, exports);
	Render::Init(env, exports);
	Events::Init(env, exports);
	Opengl::Init(env, exports);
	
  return exports;
}

NODE_API_MODULE(addon, Init)