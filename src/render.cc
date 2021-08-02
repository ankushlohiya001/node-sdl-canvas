#include "render.h"
#include "video.h"

Render::Texture::Texture(const Napi::CallbackInfo& info) : ObjectWrap(info){
	Render::Renderer* ren = Napi::ObjectWrap<Render::Renderer>::Unwrap(info[0].As<Napi::Object>());

	int wid = 1280;
	int hei = 720;

	if(info[1].IsNumber()){
		wid = info[1].As<Napi::Number>();
	}

	if(info[2].IsNumber()){
		hei = info[2].As<Napi::Number>();
	}

	this->wid = wid;
	this->hei = hei;
	this->ref = SDL_CreateTexture(ren->ref, SDL_PIXELFORMAT_ARGB8888, SDL_TEXTUREACCESS_STREAMING, wid, hei);
}

void Render::Texture::update(const Napi::CallbackInfo& info){
	SDL_Rect rect;
	rect.x = 0;
	rect.y = 0;
	rect.w = this->wid;
	rect.h = this->hei;


	if(!info[0].IsBuffer()) return;

	unsigned char* pixels = {};

	Napi::Buffer<unsigned char*> buf = info[0].As<Napi::Buffer<unsigned char*>>();
	pixels = reinterpret_cast<unsigned char*>(buf.Data());
	
	SDL_UpdateTexture(this->ref, &rect, pixels, this->wid * 4);

}

void Render::Texture::destroy(const Napi::CallbackInfo& info){
	if(this->ref != nullptr){
		// native api call
		SDL_DestroyTexture(this->ref);
		this->ref = nullptr;
	}
}

Napi::FunctionReference* Render::Texture::constructor = new Napi::FunctionReference();

Napi::Function Render::Texture::GetClass(Napi::Env& env){
	Napi::Function func = DefineClass(env, "Texture", {
		InstanceMethod("update", &Texture::update),
		InstanceMethod("destroy", &Texture::destroy),
	});

	*(Texture::constructor) = Napi::Persistent(func);
	return func;
}

////////////////////////////////////////////////////////
//// SDL_Renderer


Render::Renderer::Renderer(const Napi::CallbackInfo& info) : ObjectWrap(info){
	Video::Window* win = Napi::ObjectWrap<Video::Window>::Unwrap(info[0].As<Napi::Object>());
	
	this->ref = SDL_CreateRenderer(win->ref, 0, SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC);
}

void Render::Renderer::render(const Napi::CallbackInfo& info){
	Render::Texture* texture = Napi::ObjectWrap<Render::Texture>::Unwrap(info[0].As<Napi::Object>());

	SDL_Rect rect;
	rect.x = 0;
	rect.y = 0;
	rect.w = texture->wid;
	rect.h = texture->hei;

	SDL_RenderClear(this->ref);
	SDL_RenderCopy(this->ref, texture->ref, &rect, &rect);
	SDL_RenderPresent(this->ref);
}

void Render::Renderer::destroy(const Napi::CallbackInfo& info){
	if(this->ref != nullptr){
		// native api call
		SDL_DestroyRenderer(this->ref);
		this->ref = nullptr;
	}
}

Napi::FunctionReference* Render::Renderer::constructor = new Napi::FunctionReference();

Napi::Function Render::Renderer::GetClass(Napi::Env& env){
	Napi::Function func = DefineClass(env, "Renderer", {
		InstanceMethod("destroy", &Renderer::destroy),
		InstanceMethod("render", &Renderer::render),
	});

	*(Renderer::constructor) = Napi::Persistent(func);
	return func;
}

//////////////////////////////////////////////////////////
/////// init & exports

void Render::Init(Napi::Env& env, Napi::Object& exports){
	exports.Set(Napi::String::New(env, "Renderer"), Render::Renderer::GetClass(env));
	exports.Set(Napi::String::New(env, "Texture"), Render::Texture::GetClass(env));
}
