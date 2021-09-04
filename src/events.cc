#include "events.h"
Events::EventWatcher::EventWatcher(const Napi::CallbackInfo& info) : ObjectWrap(info){}

void Events::EventWatcher::setCallback(const Napi::CallbackInfo& info){
	if(!info[0].IsFunction()) return;
	this->cbRef = Napi::Persistent(info[0].As<Napi::Function>());
}

void Events::EventWatcher::pollEvent(const Napi::CallbackInfo& info){
	Napi::Env env = info.Env();
	while(SDL_PollEvent(&(this->eve))){
		this->cbRef.Call({Napi::Number::New(env, this->eve.type), Napi::Number::New(env, this->eve.window.windowID)});
	}
}

void Events::EventWatcher::setCommonEvent(Napi::Env& env, Napi::Object& commonEvent){
	commonEvent.Set("type", Napi::Number::New(env, this->eve.type));
	commonEvent.Set("windowID", Napi::Number::New(env, this->eve.window.windowID));
	commonEvent.Set("timestamp", Napi::Number::New(env, this->eve.common.timestamp));
}

Napi::Value Events::EventWatcher::getWindowEvent(const Napi::CallbackInfo& info){
	Napi::Env env = info.Env();
	Napi::Object currentEvent = Napi::Object::New(env);
	// if(this->eve == nullptr) return currentEvent;

	setCommonEvent(env, currentEvent);
	
	int x, y, w, h;
	SDL_Window* win = SDL_GetWindowFromID(this->eve.window.windowID);
	SDL_GetWindowPosition(win, &x, &y);
	SDL_GetWindowSize(win, &w, &h);


	currentEvent.Set("event", Napi::Number::New(env, this->eve.window.event));
	currentEvent.Set("x", Napi::Number::New(env, x));
	currentEvent.Set("y", Napi::Number::New(env, y));
	currentEvent.Set("w", Napi::Number::New(env, w));
	currentEvent.Set("h", Napi::Number::New(env, h));

	return currentEvent;
}

Napi::Value Events::EventWatcher::getMouseEvent(const Napi::CallbackInfo& info){
	Napi::Env env = info.Env();
	Napi::Object currentEvent = Napi::Object::New(env);
	// if(this->eve == nullptr) return currentEvent;

	setCommonEvent(env, currentEvent);

	int x, y;
	int buttons = SDL_GetMouseState(&x, &y);
	bool isLeft = (buttons & SDL_BUTTON(SDL_BUTTON_LEFT)) != 0;
	bool isMiddle = (buttons & SDL_BUTTON(SDL_BUTTON_MIDDLE)) != 0;
	bool isRight = (buttons & SDL_BUTTON(SDL_BUTTON_RIGHT)) != 0;

	currentEvent.Set("x", Napi::Number::New(env, x));
	currentEvent.Set("y", Napi::Number::New(env, y));

	currentEvent.Set("dx", Napi::Number::New(env, this->eve.wheel.x));
	currentEvent.Set("dy", Napi::Number::New(env, this->eve.wheel.y));

	currentEvent.Set("count", Napi::Number::New(env, this->eve.button.clicks));
	currentEvent.Set("left", Napi::Number::New(env, isLeft));
	currentEvent.Set("middle", Napi::Number::New(env, isMiddle));
	currentEvent.Set("right", Napi::Number::New(env, isRight));

	return currentEvent;
}


Napi::Value Events::EventWatcher::getKeyboardEvent(const Napi::CallbackInfo& info){
	Napi::Env env = info.Env();
	Napi::Object currentEvent = Napi::Object::New(env);
	// if(this->eve == nullptr) return currentEvent;

	setCommonEvent(env, currentEvent);

	currentEvent.Set("keyName", Napi::String::New(env, SDL_GetKeyName(this->eve.key.keysym.sym)));
	currentEvent.Set("codeName", Napi::String::New(env, SDL_GetScancodeName(this->eve.key.keysym.scancode)));

	return currentEvent;
}

Napi::Function Events::EventWatcher::getClass(Napi::Env& env){
	return DefineClass(env, "EventWatcher", {
		InstanceMethod("pollEvent", &EventWatcher::pollEvent),
		InstanceMethod("setCallback", &EventWatcher::setCallback),
		InstanceAccessor<&EventWatcher::getWindowEvent>("windowEvent"),
		InstanceAccessor<&EventWatcher::getMouseEvent>("mouseEvent"),
		InstanceAccessor<&EventWatcher::getKeyboardEvent>("keyboardEvent"),
	});
}

void Events::Init(Napi::Env& env, Napi::Object& exports){
	exports.Set("EventWatcher", Events::EventWatcher::getClass(env));
}