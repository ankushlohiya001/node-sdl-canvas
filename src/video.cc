#include "video.h"

void freePointer(napi_env env, void * data, void * pointer) {
	if (!pointer) { return; }
	free(pointer);
}

Video::Window::Window(const Napi::CallbackInfo& info) : ObjectWrap(info){
	
	int pos_x = info[0].As<Napi::Number>();
	int pos_y = info[1].As<Napi::Number>();
	int width = info[2].As<Napi::Number>();
	int height = info[3].As<Napi::Number>();
	std::string title = info[4].As<Napi::String>().Utf8Value();
	uint flags = info[5].As<Napi::Number>();

	this->ref = SDL_CreateWindow(title.c_str(), pos_x, pos_y, width, height, flags);
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

void Video::Window::setIcon(const Napi::CallbackInfo& info){

	if(!info[0].IsBuffer()) return;

	int wid = info[1].As<Napi::Number>();
	int hei = info[2].As<Napi::Number>();

	unsigned char* pixels = {};

	Napi::Buffer<unsigned char*> buf = info[0].As<Napi::Buffer<unsigned char*>>();
	pixels = reinterpret_cast<unsigned char*>(buf.Data());
	
	// native api call
	SDL_Surface* surf = SDL_CreateRGBSurfaceWithFormatFrom(pixels, wid, hei, 32, wid * 4, SDL_PIXELFORMAT_ARGB8888);
	SDL_SetWindowIcon(this->ref, surf);
	SDL_FreeSurface(surf);
}


Napi::Value Video::Window::getPosition(const Napi::CallbackInfo& info){
	Napi::Env env = info.Env();

	int x, y;
	// native api call
	SDL_GetWindowPosition(this->ref, &x, &y);

	Napi::Object pos = Napi::Object::New(env);
	pos.Set("x", Napi::Number::New(env, x));
	pos.Set("y", Napi::Number::New(env, y));
	return pos;
}

void Video::Window::setPosition(const Napi::CallbackInfo& info, const Napi::Value& value){
	if(value.IsObject()){
		Napi::Object pos = value.As<Napi::Object>();
		// native api call
		SDL_SetWindowPosition(this->ref, pos.Get("x").As<Napi::Number>(), pos.Get("y").As<Napi::Number>());
	}
}

/*--------------------------------------------------------------*/
// size
/*--------------------------------------------------------------*/
Napi::Value Video::Window::getSize(const Napi::CallbackInfo& info){
	Napi::Env env = info.Env();

	int w, h;
	// native api call
	SDL_GetWindowSize(this->ref, &w, &h);
	Napi::Object size = Napi::Object::New(env);
	size.Set("w", Napi::Number::New(env, w));
	size.Set("h", Napi::Number::New(env, h));
	return size;
}

void Video::Window::setSize(const Napi::CallbackInfo& info, const Napi::Value& value){
	if(value.IsObject()){
		Napi::Object size = value.As<Napi::Object>();
		// native api call
		SDL_SetWindowSize(this->ref, size.Get("w").As<Napi::Number>(), size.Get("h").As<Napi::Number>());
	}
}

Napi::Value Video::Window::getMinSize(const Napi::CallbackInfo& info){
	Napi::Env env = info.Env();

	int w, h;
	// native api call
	SDL_GetWindowMinimumSize(this->ref, &w, &h);
	Napi::Object size = Napi::Object::New(env);
	size.Set("w", Napi::Number::New(env, w));
	size.Set("h", Napi::Number::New(env, h));
	return size;
}

void Video::Window::setMinSize(const Napi::CallbackInfo& info, const Napi::Value& value){
	if(value.IsObject()){
		Napi::Object size = value.As<Napi::Object>();
		// native api call
		SDL_SetWindowMinimumSize(this->ref, size.Get("w").As<Napi::Number>(), size.Get("h").As<Napi::Number>());
	}
}

Napi::Value Video::Window::getMaxSize(const Napi::CallbackInfo& info){
	Napi::Env env = info.Env();

	int w, h;
	// native api call
	SDL_GetWindowMaximumSize(this->ref, &w, &h);
	Napi::Object size = Napi::Object::New(env);
	size.Set("w", Napi::Number::New(env, w));
	size.Set("h", Napi::Number::New(env, h));
	return size;
}

void Video::Window::setMaxSize(const Napi::CallbackInfo& info, const Napi::Value& value){
	if(value.IsObject()){
		Napi::Object size = value.As<Napi::Object>();
		// native api call
		SDL_SetWindowMaximumSize(this->ref, size.Get("w").As<Napi::Number>(), size.Get("h").As<Napi::Number>());
	}
}
/*-----------------------------------------------------------*/

Napi::Value Video::Window::getId(const Napi::CallbackInfo& info){
	return Napi::Number::New(info.Env(), SDL_GetWindowID(this->ref));
}

Napi::Value Video::Window::isDestroyed(const Napi::CallbackInfo& info){
	return Napi::Boolean::New(info.Env(), this->ref == nullptr);
}

Napi::Value Video::Window::getResizable(const Napi::CallbackInfo& info){
	bool isFull = (SDL_GetWindowFlags(this->ref) & SDL_WINDOW_RESIZABLE) != 0;
	return Napi::Boolean::New(info.Env(), isFull);
}

void Video::Window::setResizable(const Napi::CallbackInfo& info, const Napi::Value& value){
	if(value.IsBoolean()){
		// native api call
		SDL_SetWindowResizable(this->ref, value.As<Napi::Boolean>()?SDL_TRUE:SDL_FALSE);
	}
}

Napi::Value Video::Window::getFullscreen(const Napi::CallbackInfo& info){
	bool isFull = (SDL_GetWindowFlags(this->ref) & SDL_WINDOW_FULLSCREEN_DESKTOP) != 0;
	return Napi::Boolean::New(info.Env(), isFull);
}

void Video::Window::setFullscreen(const Napi::CallbackInfo& info, const Napi::Value& value){
	uint flag = 0;
	if(value.As<Napi::Boolean>()){
		flag = SDL_WINDOW_FULLSCREEN_DESKTOP;
	}
	SDL_SetWindowFullscreen(this->ref, flag);
}

void Video::Window::setGrab(const Napi::CallbackInfo& info, const Napi::Value& value){
	if(value.IsBoolean()){
		// native api call
		SDL_SetWindowGrab(this->ref, value.As<Napi::Boolean>()?SDL_TRUE:SDL_FALSE);
	}
}

Napi::Value Video::Window::getGrab(const Napi::CallbackInfo& info){
		// native api call
	return Napi::Boolean::New(info.Env(), SDL_GetWindowGrab(this->ref)==SDL_TRUE);
}

void Video::Window::setOpacity(const Napi::CallbackInfo& info, const Napi::Value& value){
	if(value.IsNumber()){
		// native api call
		SDL_SetWindowOpacity(this->ref, value.As<Napi::Number>());
	}
}

Napi::Value Video::Window::getOpacity(const Napi::CallbackInfo& info){
		// native api call
	float opacity;
	SDL_GetWindowOpacity(this->ref, &opacity);
	return Napi::Number::New(info.Env(), opacity);
}

void Video::Window::setBrightness(const Napi::CallbackInfo& info, const Napi::Value& value){
	if(value.IsNumber()){
		// native api call
		SDL_SetWindowBrightness(this->ref, value.As<Napi::Number>());
	}
}

Napi::Value Video::Window::getBrightness(const Napi::CallbackInfo& info){
		// native api call
	float opacity = SDL_GetWindowBrightness(this->ref);
	return Napi::Number::New(info.Env(), opacity);
}

Napi::Value Video::Window::getBordered(const Napi::CallbackInfo& info){
	bool isFull = (SDL_GetWindowFlags(this->ref) & SDL_WINDOW_BORDERLESS) == 0;
	return Napi::Boolean::New(info.Env(), isFull);
}

void Video::Window::setBordered(const Napi::CallbackInfo& info, const Napi::Value& value){
	SDL_SetWindowBordered(this->ref, value.As<Napi::Boolean>()?SDL_TRUE:SDL_FALSE);
}

Napi::Value Video::Window::getRef(const Napi::CallbackInfo& info){
	Napi::Env env = info.Env();

	SDL_SysWMinfo inf;
	SDL_VERSION(&(inf.version));
	SDL_GetWindowWMInfo(this->ref, &inf);
	int size = sizeof(NativeWindow);
	NativeWindow * pointer = (NativeWindow *) malloc(size);
	*pointer = inf.info.x11.window;

	napi_value value;
	napi_create_external_buffer(env, size, pointer, freePointer, pointer, &value);

	return Napi::Value(env, value);
}

void Video::Window::setBlendMode(const Napi::CallbackInfo& info, const Napi::Value& value){
	int mod = value.As<Napi::Number>();

	SDL_Surface* surf = SDL_GetWindowSurface(this->ref);
	SDL_SetSurfaceBlendMode(surf, (SDL_BlendMode) mod);
}

Napi::Value Video::Window::getBlendMode(const Napi::CallbackInfo& info){
	SDL_BlendMode mod;
	SDL_Surface* surf = SDL_GetWindowSurface(this->ref);
	SDL_GetSurfaceBlendMode(surf, &mod);
	return Napi::Number::New(info.Env(), mod);
}

void Video::Window::clearSurface(const Napi::CallbackInfo& info){
	SDL_Rect rect;
	rect.x = 0;
	rect.y = 0;
	SDL_GetWindowSize(this->ref, &(rect.w), &(rect.h));
	
	SDL_Surface* win_surf = SDL_GetWindowSurface(this->ref);
	SDL_FillRect(win_surf, &rect, 0x000000);
}


void Video::Window::updateSurface(const Napi::CallbackInfo& info){
	if(!info[0].IsBuffer()) return;
	
	unsigned char* pixels = {};
	Napi::Buffer<unsigned char*> buf = info[0].As<Napi::Buffer<unsigned char*>>();
	pixels = reinterpret_cast<unsigned char*>(buf.Data());

	int w = info[3].As<Napi::Number>();
	int h = info[4].As<Napi::Number>();

	SDL_Surface* pix_surf = SDL_CreateRGBSurfaceWithFormatFrom(pixels, w, h, 32, w * 4, SDL_PIXELFORMAT_ARGB8888);

	SDL_SetSurfaceBlendMode(pix_surf, SDL_BLENDMODE_BLEND);

	SDL_Rect d_rect;
	d_rect.x = info[1].As<Napi::Number>();
	d_rect.y = info[2].As<Napi::Number>();
	
	SDL_Surface* win_surf = SDL_GetWindowSurface(this->ref);

	SDL_BlitSurface(pix_surf, NULL, win_surf, &d_rect);
	SDL_FreeSurface(pix_surf);
}

void Video::Window::render(const Napi::CallbackInfo& info){
	SDL_UpdateWindowSurface(this->ref);
}

void Video::Window::raise(const Napi::CallbackInfo& info){
		// native api call
	SDL_RaiseWindow(this->ref);
}

void Video::Window::restore(const Napi::CallbackInfo& info){
		// native api call
	SDL_RestoreWindow(this->ref);
}

Napi::Value Video::Window::shown(const Napi::CallbackInfo& info){
	bool focus = (SDL_GetWindowFlags(this->ref) & SDL_WINDOW_SHOWN) == 0;
	return Napi::Boolean::New(info.Env(), focus);
}

void Video::Window::show(const Napi::CallbackInfo& info){
		// native api call
	SDL_ShowWindow(this->ref);
}

void Video::Window::hide(const Napi::CallbackInfo& info){
		// native api call
	SDL_HideWindow(this->ref);
}

Napi::Value Video::Window::maximized(const Napi::CallbackInfo& info){
	bool isMaxi = (SDL_GetWindowFlags(this->ref) & SDL_WINDOW_MAXIMIZED) == 0;
	return Napi::Boolean::New(info.Env(), isMaxi);
}

void Video::Window::maximize(const Napi::CallbackInfo& info){
		// native api call
	SDL_MaximizeWindow(this->ref);
}

Napi::Value Video::Window::minimized(const Napi::CallbackInfo& info){
	bool isMini = (SDL_GetWindowFlags(this->ref) & SDL_WINDOW_MINIMIZED) == 0;
	return Napi::Boolean::New(info.Env(), isMini);
}

void Video::Window::minimize(const Napi::CallbackInfo& info){
		// native api call
	SDL_MinimizeWindow(this->ref);
}

void Video::Window::flash(const Napi::CallbackInfo& info){
	int type = info[0].As<Napi::Number>();

	// native api call
	SDL_FlashWindow(this->ref, (SDL_FlashOperation) type);
}

void Video::Window::setCursor(const Napi::CallbackInfo& info, const Napi::Value& value){
	if (value.IsUndefined()){
		SDL_ShowCursor(0);
		return;
	}
	int id = value.As<Napi::Number>();
	SDL_Cursor* cursor = SDL_CreateSystemCursor((SDL_SystemCursor)id);
	SDL_SetCursor(cursor);
}

Napi::Value Video::Window::getCursor(const Napi::CallbackInfo& info){
	return Napi::Boolean::New(info.Env(), SDL_ShowCursor(0)==1);
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
		InstanceAccessor<&Window::getMinSize, &Window::setMinSize>("minSize"),
		InstanceAccessor<&Window::getMaxSize, &Window::setMaxSize>("maxSize"),
		InstanceAccessor<&Window::getFullscreen, &Window::setFullscreen>("fullscreen"),
		InstanceAccessor<&Window::getResizable, &Window::setResizable>("resizable"),
		InstanceAccessor<&Window::getGrab, &Window::setGrab>("grab"),
		InstanceAccessor<&Window::getBordered, &Window::setBordered>("bordered"),
		InstanceAccessor<&Window::getOpacity, &Window::setOpacity>("opacity"),
		InstanceAccessor<&Window::getBlendMode, &Window::setBlendMode>("blendMode"),
		InstanceAccessor<&Window::getBrightness, &Window::setBrightness>("brightness"),
		InstanceAccessor<&Window::maximized>("maximized"),
		InstanceAccessor<&Window::minimized>("minimized"),
		InstanceAccessor<&Window::shown>("shown"),
		InstanceAccessor<&Window::getCursor, &Window::setCursor>("cursor"),
		InstanceAccessor<&Window::getRef>("ref"),
		InstanceMethod("clearSurface", &Window::clearSurface),
		InstanceMethod("updateSurface", &Window::updateSurface),
		InstanceMethod("render", &Window::render),
		InstanceMethod("setIcon", &Window::setIcon),
		InstanceMethod("maximize", &Window::maximize),
		InstanceMethod("minimize", &Window::minimize),
		InstanceMethod("flash", &Window::flash),
		InstanceMethod("raise", &Window::raise),
		InstanceMethod("restore", &Window::restore),
		InstanceMethod("show", &Window::show),
		InstanceMethod("hide", &Window::hide),
		InstanceMethod("destroy", &Window::destroy),
		InstanceMethod("isDestroyed", &Window::isDestroyed),
		InstanceAccessor<&Window::getId>("id"),
	});

	*(Window::constructor) = Napi::Persistent(func);
	return func;
}

void Video::Init(Napi::Env& env, Napi::Object& exports){
	exports.Set(Napi::String::New(env, "Window"), Window::GetClass(env));
}