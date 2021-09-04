#ifndef _NodeSdl_Video_H_
#define _NodeSdl_Video_H_

#include <napi.h>
#include <SDL.h>

namespace Video{

	class Window : public Napi::ObjectWrap<Window>{
	public:
		Window(const Napi::CallbackInfo&);
		
		Napi::Value getTitle(const Napi::CallbackInfo&);
		void setTitle(const Napi::CallbackInfo&, const Napi::Value&);
		void setIcon(const Napi::CallbackInfo&);
		
		Napi::Value getPosition(const Napi::CallbackInfo&);
		void setPosition(const Napi::CallbackInfo&, const Napi::Value&);
		
		Napi::Value getSize(const Napi::CallbackInfo&);
		void setSize(const Napi::CallbackInfo&, const Napi::Value&);

		Napi::Value getMinSize(const Napi::CallbackInfo&);
		void setMinSize(const Napi::CallbackInfo&, const Napi::Value&);

		Napi::Value getMaxSize(const Napi::CallbackInfo&);
		void setMaxSize(const Napi::CallbackInfo&, const Napi::Value&);

		Napi::Value getId(const Napi::CallbackInfo&);
		Napi::Value isDestroyed(const Napi::CallbackInfo&);

		Napi::Value getFullscreen(const Napi::CallbackInfo&);
		void setFullscreen(const Napi::CallbackInfo&, const Napi::Value&);

		Napi::Value getGrab(const Napi::CallbackInfo&);
		void setGrab(const Napi::CallbackInfo&, const Napi::Value&);

		Napi::Value getOpacity(const Napi::CallbackInfo&);
		void setOpacity(const Napi::CallbackInfo&, const Napi::Value&);
		
		Napi::Value getBrightness(const Napi::CallbackInfo&);
		void setBrightness(const Napi::CallbackInfo&, const Napi::Value&);

		Napi::Value getResizable(const Napi::CallbackInfo&);
		void setResizable(const Napi::CallbackInfo&, const Napi::Value&);

		Napi::Value getBordered(const Napi::CallbackInfo&);
		void setBordered(const Napi::CallbackInfo&, const Napi::Value&);

		Napi::Value minimized(const Napi::CallbackInfo&);
		Napi::Value maximized(const Napi::CallbackInfo&);
		Napi::Value shown(const Napi::CallbackInfo&);

		Napi::Value getCursor(const Napi::CallbackInfo&);
		void setCursor(const Napi::CallbackInfo&, const Napi::Value&);

		void createGLContext(const Napi::CallbackInfo&);
		void deleteGLContext(const Napi::CallbackInfo&);
		void swap(const Napi::CallbackInfo&);
		void raise(const Napi::CallbackInfo&);
		void restore(const Napi::CallbackInfo&);
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