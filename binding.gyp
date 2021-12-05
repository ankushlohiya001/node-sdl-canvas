{
	"targets":[
		{
			"target_name": "addon",
			"sources": [
				"src/sdl.cc",
				"src/video.cc",
				"src/events.cc",
			],
			"include_dirs": ["<!(node -p \"require('node-addon-api').include_dir\")"],
			"libraries": ["<!@(sdl2-config --libs)"],
			"cflags": ["<!@(sdl2-config --cflags)"],
			"cflags!": [ "-fno-exceptions" ],
			"cflags_cc!": [ "-fno-exceptions" ],
			"xcode_settings": {
            "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
            "CLANG_CXX_LIBRARY": "libc++",
            "MACOSX_DEPLOYMENT_TARGET": "10.7",
            },
            "msvs_settings": {
                "VCCLCompilerTool": { "ExceptionHandling": 1 },
            },
		}
	]
}
