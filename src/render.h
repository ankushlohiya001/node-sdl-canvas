#ifndef _NodeSdl_Render_h
#define _NodeSdl_Render_h

#include <napi.h>
#include <SDL.h>

namespace Render{

	class Texture : public Napi::ObjectWrap<Texture>{
	public:
		Texture(const Napi::CallbackInfo&);
		void update(const Napi::CallbackInfo&);
		void destroy(const Napi::CallbackInfo&);

		static Napi::FunctionReference* constructor;
		static Napi::Function GetClass(Napi::Env&);	
	// private:
		SDL_Texture* ref;
		int wid, hei;
	};

	class Renderer : public Napi::ObjectWrap<Renderer>{
	public:
		Renderer(const Napi::CallbackInfo&);
		void render(const Napi::CallbackInfo&);
		void destroy(const Napi::CallbackInfo&);
		
		static Napi::Function GetClass(Napi::Env&);
		static Napi::FunctionReference* constructor;
	// private:
		SDL_Renderer* ref;
	};

	void Init(Napi::Env&, Napi::Object&);
}

#endif // _NodeSdl_Render_h