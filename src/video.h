#ifndef _NodeSdl_Video_H_
#define _NodeSdl_Video_H_

#include <napi.h>
#include <SDL.h>

namespace Video{
	// Napi::Value GetNumDisplayMode(const Napi::CallbackInfo&);
	// Napi::Value GetDisplayMode(const Napi::CallbackInfo&);
	// Napi::Value GetDesktopDisplayMode(const Napi::CallbackInfo&);
	// Napi::Value GetCurrentDisplayMode(const Napi::CallbackInfo&);
	// Napi::Value GetClosestDisplayMode(const Napi::CallbackInfo&);
	// Napi::Value SetWindowDisplayMode(const Napi::CallbackInfo&);
	// Napi::Value GetWindowDisplayMode(const Napi::CallbackInfo&);

	// Napi::Object DisplayMode(Napi::Env& env){
	// 	Napi::Object obj = Napi::Object::New(env);
	// 	obj.Set(Napi::String::New(env, "getNumDisplayMode"), Napi::Function::New(env, GetNumDisplayMode));
	// 	obj.Set(Napi::String::New(env, "getDisplayMode"), Napi::Function::New(env, GetDisplayMode));
	// 	obj.Set(Napi::String::New(env, "getDesktopDisplayMode"), Napi::Function::New(env, GetDesktopDisplayMode));
	// 	obj.Set(Napi::String::New(env, "getCurrentDisplayMode"), Napi::Function::New(env, GetCurrentDisplayMode));
	// 	obj.Set(Napi::String::New(env, "getClosestDisplayMode"), Napi::Function::New(env, GetClosestDisplayMode));
	// 	obj.Set(Napi::String::New(env, "setWindowDisplayMode"), Napi::Function::New(env, SetWindowDisplayMode));
	// 	obj.Set(Napi::String::New(env, "getWindowDisplayMode"), Napi::Function::New(env, GetWindowDisplayMode));
	// }

	class Window : public Napi::ObjectWrap<Window>{
	public:
		Window(const Napi::CallbackInfo&);
		
		Napi::Value getTitle(const Napi::CallbackInfo&);
		void setTitle(const Napi::CallbackInfo&, const Napi::Value&);
		
		Napi::Value getPosition(const Napi::CallbackInfo&);
		void setPosition(const Napi::CallbackInfo&, const Napi::Value&);
		
		Napi::Value getSize(const Napi::CallbackInfo&);
		void setSize(const Napi::CallbackInfo&, const Napi::Value&);

		Napi::Value getId(const Napi::CallbackInfo&);
		Napi::Value isDestroyed(const Napi::CallbackInfo&);

		void showBorder(const Napi::CallbackInfo&);
		void setResizable(const Napi::CallbackInfo&);
		void setGrab(const Napi::CallbackInfo&);
		

		void show(const Napi::CallbackInfo&);
		void hide(const Napi::CallbackInfo&);
		void maximize(const Napi::CallbackInfo&);
		void minimize(const Napi::CallbackInfo&);
		void destroy(const Napi::CallbackInfo&);

	static Napi::Function GetClass(Napi::Env&);

	static Napi::FunctionReference* constructor;
	// private:
		SDL_Window* ref;
	};

	void Init(Napi::Env&, Napi::Object&);

}

#endif // _NodeSdl_Video_H_