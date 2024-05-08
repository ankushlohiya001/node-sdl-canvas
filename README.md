# node-sdl-canvas

node-sdl-canvas is a Node.js module that builds upon node-sdl to provide a DOM-like interface for creating windows, canvases, and handling events. It aims to simplify the development of multimedia applications and games by offering familiar constructs similar to web development.

## Features

- **DOM-like Interface**: Create windows, canvases, and handle events using familiar DOM concepts.
- **Integration with node-sdl**: Utilize the power of SDL with a simplified API for graphics and input handling.
- **Event-driven Programming**: Respond to user input and system events with ease.
- **Cross-Platform Compatibility**: Develop applications that run seamlessly across different platforms.

## Installation

Before installing node-sdl-canvas, make sure you have node-sdl installed. Then, install node-sdl-canvas using npm:

```bash
npm install node-sdl-canvas

```

## Usage

Here's a simple example demonstrating how to use node-sdl-canvas to create a window with a canvas and handle mouse events:

```javascript
const document = require("node-sdl-canvas");

// Create a window
const window = document.createElement("window");
document.window = window;

// Create a canvas and append it to the window
const canvas = document.createElement("canvas");
document.appendChild(canvas);

// Get 2D rendering context for the canvas
const ctx = canvas.getContext("2d");

// Add event listener for mousemove event on the window
window.addEventListener("mousemove", (event) => {
  // Clear the canvas
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Get mouse coordinates
  const x = event.clientX;
  const y = event.clientY;

  // Draw a circle at mouse position
  ctx.beginPath();
  ctx.arc(x, y, 100, 0, Math.PI * 2);
  ctx.strokeStyle = "#000";
  ctx.stroke();

  // Render the changes to the window
  window.render();
});
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

Before contributing, please review our contributing guidelines for instructions on how to contribute to the project.
