#ifndef _NodeSdl_Events_h
#define _NodeSdl_Events_h

#include <napi.h>
#include <SDL.h>

namespace Events{
	
	class EventWatcher : public Napi::ObjectWrap<EventWatcher>{
	public:
		EventWatcher(const Napi::CallbackInfo&);
		void pollEvent(const Napi::CallbackInfo&);
		void setCallback(const Napi::CallbackInfo&);

		void setCommonEvent(Napi::Env&, Napi::Object&);
		Napi::Value getWindowEvent(const Napi::CallbackInfo&);
		Napi::Value getMouseEvent(const Napi::CallbackInfo&);
		Napi::Value getKeyboardEvent(const Napi::CallbackInfo&);

		static Napi::Function getClass(Napi::Env&);
	private:
		SDL_Event eve;
		Napi::FunctionReference cbRef;
	};
	
	void Init(Napi::Env&, Napi::Object&);
}

#endif