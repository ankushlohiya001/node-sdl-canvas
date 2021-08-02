#include "video.h"

Video::Window::Window(const Napi::CallbackInfo& info) : ObjectWrap(info){
	// Napi::Env env = info.Env();
	
	std::string title = "node-sdl";
	int pos_x = 0x2FFF0000u, pos_y = 0x2FFF0000u;
	int width = 1280, height = 720;

	switch(info.Length()){
		case 1:
			if(info[0].IsString()){
				title = info[0].As<Napi::String>().Utf8Value();
			}
			break;
		case 2:
			if(info[0].IsNumber() && info[1].IsNumber()){
				width = info[0].As<Napi::Number>();
				height = info[1].As<Napi::Number>();
			}
			break;
		case 3:
			if(info[0].IsNumber() && info[1].IsNumber() && info[2].IsString()){
				width = info[0].As<Napi::Number>();
				height = info[1].As<Napi::Number>();
				title = info[2].As<Napi::String>().Utf8Value();
			}
			break;
		case 4:
			if(info[0].IsNumber() && info[1].IsNumber()
				&& info[2].IsNumber() && info[3].IsNumber()){
				pos_x = info[0].As<Napi::Number>();
				pos_y = info[1].As<Napi::Number>();
				width = info[2].As<Napi::Number>();
				height = info[3].As<Napi::Number>();
			}
			break;
	}

	this->ref = SDL_CreateWindow(title.c_str(), pos_x, pos_y, width, height, SDL_WINDOW_SHOWN | SDL_WINDOW_OPENGL);
}

Napi::Value Video::Window::getTitle(const Napi::CallbackInfo& info){
	return Napi::String::New(info.Env(), SDL_GetWindowTitle(this->ref));
}

void Video::Window::setTitle(const Napi::CallbackInfo& info, const Napi::Value& value){
	if(value.IsString()){
		// native api call
		SDL_SetWindowTitle(this->ref, value.As<Napi::String>().Utf8Value().c_str());
	}
}

Napi::Value Video::Window::getPosition(const Napi::CallbackInfo& info){
	Napi::Env env = info.Env();

	int x, y;
	// native api call
	SDL_GetWindowPosition(this->ref, &x, &y);

	Napi::Int8Array arr = Napi::Int8Array::New(env, 2);
	arr[0] = x;
	arr[1] = y;
	return arr;
}

void Video::Window::setPosition(const Napi::CallbackInfo& info, const Napi::Value& value){
	if(value.IsTypedArray()){
		Napi::Int8Array arr = value.As<Napi::Int8Array>();
		// native api call
		SDL_SetWindowPosition(this->ref, arr[0], arr[1]);
	}
}

Napi::Value Video::Window::getSize(const Napi::CallbackInfo& info){
	Napi::Env env = info.Env();

	int w, h;
	// native api call
	SDL_GetWindowSize(this->ref, &w, &h);

	Napi::Int8Array arr = Napi::Int8Array::New(env, 2);
	arr[0] = w;
	arr[1] = h;
	return arr;
}

Napi::Value Video::Window::getId(const Napi::CallbackInfo& info){
	return Napi::Number::New(info.Env(), SDL_GetWindowID(this->ref));
}

Napi::Value Video::Window::isDestroyed(const Napi::CallbackInfo& info){
	return Napi::Boolean::New(info.Env(), this->ref == nullptr);
}

void Video::Window::setSize(const Napi::CallbackInfo& info, const Napi::Value& value){
	if(value.IsTypedArray()){
		Napi::Int8Array arr = value.As<Napi::Int8Array>();
		// native api call
		SDL_SetWindowSize(this->ref, arr[0], arr[1]);
	}
}

void Video::Window::showBorder(const Napi::CallbackInfo& info){
	if(info[0].IsBoolean()){
		// native api call
		SDL_SetWindowBordered(this->ref, info[0].As<Napi::Boolean>()?SDL_TRUE:SDL_FALSE);
	}
}

void Video::Window::setResizable(const Napi::CallbackInfo& info){
	if(info[0].IsBoolean()){
		// native api call
		SDL_SetWindowResizable(this->ref, info[0].As<Napi::Boolean>()?SDL_TRUE:SDL_FALSE);
	}
}

void Video::Window::setGrab(const Napi::CallbackInfo& info){
	if(info[0].IsBoolean()){
		// native api call
		SDL_SetWindowGrab(this->ref, info[0].As<Napi::Boolean>()?SDL_TRUE:SDL_FALSE);
	}
}

void Video::Window::show(const Napi::CallbackInfo& info){
		// native api call
	SDL_ShowWindow(this->ref);
}

void Video::Window::hide(const Napi::CallbackInfo& info){
		// native api call
	SDL_HideWindow(this->ref);
}

void Video::Window::maximize(const Napi::CallbackInfo& info){
		// native api call
	SDL_MaximizeWindow(this->ref);
}

void Video::Window::minimize(const Napi::CallbackInfo& info){
		// native api call
	SDL_MinimizeWindow(this->ref);
}

void Video::Window::destroy(const Napi::CallbackInfo& info){
	if(this->ref != nullptr){
		// native api call
		SDL_DestroyWindow(this->ref);
		this->ref = nullptr;
	}
}

Napi::FunctionReference* Video::Window::constructor = new Napi::FunctionReference();

Napi::Function Video::Window::GetClass(Napi::Env& env){
	Napi::Function func = DefineClass(env, "Window", {
		InstanceAccessor<&Window::getTitle, &Window::setTitle>("title"),
		InstanceAccessor<&Window::getPosition, &Window::setPosition>("position"),
		InstanceAccessor<&Window::getSize, &Window::setSize>("size"),
		InstanceMethod("maximize", &Window::maximize),
		InstanceMethod("minimize", &Window::minimize),
		InstanceMethod("show", &Window::show),
		InstanceMethod("hide", &Window::hide),
		InstanceMethod("destroy", &Window::destroy),
		InstanceMethod("isDestroyed", &Window::isDestroyed),
		InstanceMethod("setGrab", &Window::setGrab),
		InstanceMethod("setResizable", &Window::setResizable),
		InstanceMethod("showBorder", &Window::showBorder),
		InstanceAccessor<&Window::getId>("id"),
	});

	*(Window::constructor) = Napi::Persistent(func);
	return func;
}

void Video::Init(Napi::Env& env, Napi::Object& exports){
	exports.Set(Napi::String::New(env, "Window"), Window::GetClass(env));
}