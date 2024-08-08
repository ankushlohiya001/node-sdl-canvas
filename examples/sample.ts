import { document } from "../mod";

// Create a window
const window = document.createElement("window");
document.window = window;

// Create a canvas and append it to the window
const canvas = document.createElement("canvas");
document.appendChild(canvas, window);

// Get 2D rendering context for the canvas
const ctx = canvas.getContext("2d");

// Add event listener for mousemove event on the window
window.addEventListener("mousemove", (event: any) => {
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
