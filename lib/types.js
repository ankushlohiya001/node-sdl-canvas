const InitFlag = {
  TIMER: 0x00000001,
  AUDIO: 0x00000010,
  VIDEO: 0x00000020,
  /**< SDL_VIDEO implies SDL_EVENTS */
  JOYSTICK: 0x00000200,
  /**< SDL_JOYSTICK implies SDL_EVENTS */
  HAPTIC: 0x00001000,
  GAMECONTROLLER: 0x00002000,
  /**< SDL_GAMECONTROLLER implies SDL_JOYSTICK */
  EVENTS: 0x00004000,
  SENSOR: 0x00008000,
  NOPARACHUTE: 0x00100000,
  /**< compatibility; this flag is ignored. */
  EVERYTHING: 0x0010f231
};

const WindowFlag = {
  FULLSCREEN: 0x00000001,
  /**< fullscreen window */
  OPENGL: 0x00000002,
  /**< window usable with OpenGL context */
  SHOWN: 0x00000004,
  /**< window is visible */
  HIDDEN: 0x00000008,
  /**< window is not visible */
  BORDERLESS: 0x00000010,
  /**< no window decoration */
  RESIZABLE: 0x00000020,
  /**< window can be resized */
  MINIMIZED: 0x00000040,
  /**< window is minimized */
  MAXIMIZED: 0x00000080,
  /**< window is maximized */
  INPUT_GRABBED: 0x00000100,
  /**< window has grabbed input focus */
  INPUT_FOCUS: 0x00000200,
  /**< window has input focus */
  MOUSE_FOCUS: 0x00000400,
  /**< window has mouse focus */
  FULLSCREEN_DESKTOP: 0x00001001,
  FOREIGN: 0x00000800,
  /**< window not created by SDL */
  ALLOW_HIGHDPI: 0x00002000,
  /**< window should be created in high-DPI mode if supported.
                                                 On macOS NSHighResolutionCapable must be set true in the
                                                 application's Info.plist for this to have any effect. */
  MOUSE_CAPTURE: 0x00004000,
  /**< window has mouse captured (unrelated to INPUT_GRABBED) */
  ALWAYS_ON_TOP: 0x00008000,
  /**< window should always be above others */
  SKIP_TASKBAR: 0x00010000,
  /**< window should not be added to the taskbar */
  UTILITY: 0x00020000,
  /**< window should be treated as a utility window */
  TOOLTIP: 0x00040000,
  /**< window should be treated as a tooltip */
  POPUP_MENU: 0x00080000,
  /**< window should be treated as a popup menu */
  VULKAN: 0x10000000,
  /**< window usable for Vulkan surface */
  METAL: 0x20000000 /**< window usable for Metal view */
};

const EventType = {
  FIRSTEVENT: 0,
  /**< Unused (do not remove) */

  /* Application events */
  QUIT: 0x100,
  /**< User-requested quit */

  /* These application events have special meaning on iOS, see README-ios.md for details */
  APP_TERMINATING: 0x101,
  /**< The application is being terminated by the OS
                               Called on iOS in applicationWillTerminate()
                               Called on Android in onDestroy()
                          */
  APP_LOWMEMORY: 0x102,
  /**< The application is low on memory, free memory if possible.
                             Called on iOS in applicationDidReceiveMemoryWarning()
                             Called on Android in onLowMemory()
                        */
  APP_WILLENTERBACKGROUND: 0x103,
  /**< The application is about to enter the background
                                      Called on iOS in applicationWillResignActive()
                                      Called on Android in onPause()
                                 */
  APP_DIDENTERBACKGROUND: 0x104,
  /**< The application did enter the background and may not get CPU for some time
                                      Called on iOS in applicationDidEnterBackground()
                                      Called on Android in onPause()
                                 */
  APP_WILLENTERFOREGROUND: 0x105,
  /**< The application is about to enter the foreground
                                      Called on iOS in applicationWillEnterForeground()
                                      Called on Android in onResume()
                                 */
  APP_DIDENTERFOREGROUND: 0x106,
  /**< The application is now interactive
                                      Called on iOS in applicationDidBecomeActive()
                                      Called on Android in onResume()
                                 */

  LOCALECHANGED: 0x107,
  /**< The user's locale preferences have changed. */

  /* Display events */
  DISPLAYEVENT: 0x150,
  /**< Display state change */

  /* Window events */
  WINDOWEVENT: 0x200,
  /**< Window state change */
  SYSWMEVENT: 0x201,
  /**< System specific event */

  /* Keyboard events */
  KEYDOWN: 0x300,
  /**< Key pressed */
  KEYUP: 0x301,
  /**< Key released */
  TEXTEDITING: 0x302,
  /**< Keyboard text editing (composition) */
  TEXTINPUT: 0x303,
  /**< Keyboard text input */
  KEYMAPCHANGED: 0x304,
  /**< Keymap changed due to a system event such as an
                             input language or keyboard layout change.
                        */

  /* Mouse events */
  MOUSEMOTION: 0x400,
  /**< Mouse moved */
  MOUSEBUTTONDOWN: 0x401,
  /**< Mouse button pressed */
  MOUSEBUTTONUP: 0x402,
  /**< Mouse button released */
  MOUSEWHEEL: 0x403,
  /**< Mouse wheel motion */

  /* Joystick events */
  JOYAXISMOTION: 0x600,
  /**< Joystick axis motion */
  JOYBALLMOTION: 0x601,
  /**< Joystick trackball motion */
  JOYHATMOTION: 0x602,
  /**< Joystick hat position change */
  JOYBUTTONDOWN: 0x603,
  /**< Joystick button pressed */
  JOYBUTTONUP: 0x604,
  /**< Joystick button released */
  JOYDEVICEADDED: 0x605,
  /**< A new joystick has been inserted into the system */
  JOYDEVICEREMOVED: 0x606,
  /**< An opened joystick has been removed */

  /* Game controller events */
  CONTROLLERAXISMOTION: 0x650,
  /**< Game controller axis motion */
  CONTROLLERBUTTONDOWN: 0x651,
  /**< Game controller button pressed */
  CONTROLLERBUTTONUP: 0x652,
  /**< Game controller button released */
  CONTROLLERDEVICEADDED: 0x653,
  /**< A new Game controller has been inserted into the system */
  CONTROLLERDEVICEREMOVED: 0x654,
  /**< An opened Game controller has been removed */
  CONTROLLERDEVICEREMAPPED: 0x655,
  /**< The controller mapping was updated */
  CONTROLLERTOUCHPADDOWN: 0x656,
  /**< Game controller touchpad was touched */
  CONTROLLERTOUCHPADMOTION: 0x657,
  /**< Game controller touchpad finger was moved */
  CONTROLLERTOUCHPADUP: 0x658,
  /**< Game controller touchpad finger was lifted */
  CONTROLLERSENSORUPDATE: 0x659,
  /**< Game controller sensor was updated */

  /* Touch events */
  FINGERDOWN: 0x700,
  FINGERUP: 0x701,
  FINGERMOTION: 0x702,

  /* Gesture events */
  DOLLARGESTURE: 0x800,
  DOLLARRECORD: 0x801,
  MULTIGESTURE: 0x802,

  /* Clipboard events */
  CLIPBOARDUPDATE: 0x900,
  /**< The clipboard changed */

  /* Drag and drop events */
  DROPFILE: 0x1000,
  /**< The system requests a file open */
  DROPTEXT: 0x1001,
  /**< text/plain drag-and-drop event */
  DROPBEGIN: 0x1002,
  /**< A new set of drops is beginning (NULL filename) */
  DROPCOMPLETE: 0x1003,
  /**< Current set of drops is now complete (NULL filename) */

  /* Audio hotplug events */
  AUDIODEVICEADDED: 0x1100,
  /**< A new audio device is available */
  AUDIODEVICEREMOVED: 0x1101,
  /**< An audio device has been removed. */

  /* Sensor events */
  SENSORUPDATE: 0x1200,
  /**< A sensor was updated */

  /* Render events */
  RENDER_TARGETS_RESET: 0x2000,
  /**< The render targets have been reset and their contents need to be updated */
  RENDER_DEVICE_RESET: 0x2001,
  /**< The device has been reset and all textures need to be recreated */

  /** Events ::USEREVENT through ::LASTEVENT are for your use,
   *  and should be allocated with RegisterEvents()
   */
  USEREVENT: 0x8000,

  /**
   *  This last event is only for bounding internal arrays
   */
  LASTEVENT: 0xFFFF
};

const WindowEvent = {
  NONE: 0,
  /**< Never used */
  SHOWN: 1,
  /**< Window has been shown */
  HIDDEN: 2,
  /**< Window has been hidden */
  EXPOSED: 3,
  /**< Window has been exposed and should be
                                   redrawn */
  MOVED: 4,
  /**< Window has been moved to data1, data2
   */
  RESIZED: 5,
  /**< Window has been resized to data1xdata2 */
  SIZE_CHANGED: 6,
  /**< The window size has changed, either as
                                        a result of an API call or through the
                                        system or user changing the window size. */
  MINIMIZED: 7,
  /**< Window has been minimized */
  MAXIMIZED: 8,
  /**< Window has been maximized */
  RESTORED: 9,
  /**< Window has been restored to normal size
                                    and position */
  ENTER: 10,
  /**< Window has gained mouse focus */
  LEAVE: 11,
  /**< Window has lost mouse focus */
  FOCUS_GAINED: 12,
  /**< Window has gained keyboard focus */
  FOCUS_LOST: 13,
  /**< Window has lost keyboard focus */
  CLOSE: 14,
  /**< The window manager requests that the window be closed */
  TAKE_FOCUS: 15,
  /**< Window is being offered a focus (should SetWindowInputFocus() on itself or a subwindow, or ignore) */
  HIT_TEST: 16
};

const KeyMod = {
  NONE: 0,
  LSHIFT: 1,
  RSHIFT: 2,
  LCTRL: 64,
  RCTRL: 128,
  LALT: 256,
  RALT: 512,
  LGUI: 1024,
  RGUI: 2048,
  NUM: 4096,
  CAPS: 8192,
  MODE: 16384,
  RESERVED: 32768
};

module.exports = {
  InitFlag,
  WindowFlag,
  EventType,
  WindowEvent,
  KeyMod
}