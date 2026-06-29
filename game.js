const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Virtual resolution (your game world)
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let scale = 1;
let lastTime = 0;

// Demo object
let box = { x: 100, y: 250, speed: 150 };

// Resize + scale
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  // Set actual canvas resolution
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  // CSS size (display size)
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  // Compute scale factor
  scale = Math.min(
    canvas.width / GAME_WIDTH,
    canvas.height / GAME_HEIGHT
  );

  // Reset transform for high DPI
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Game loop
function update(dt) {
  box.x += box.speed * dt;
  if (box.x > GAME_WIDTH) box.x = -50;
}

function draw() {
  ctx.save();

  // Center the game world
  const offsetX = (canvas.width / scale - GAME_WIDTH) / 2;
  const offsetY = (canvas.height / scale - GAME_HEIGHT) / 2;

  ctx.scale(scale, scale);
  ctx.translate(offsetX, offsetY);

  // Draw game world
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = "red";
  ctx.fillRect(box.x, box.y, 50, 50);

  ctx.restore();
}

function loop(timestamp) {
  const dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  update(dt);
  draw();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
