const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Virtual resolution (like Love2D)
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let scale = 1;
let lastTime = 0;

// Simple demo object
let box = { x: 100, y: 100, speed: 120 };

// Resize + scale logic
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  scale = Math.min(
    canvas.width / GAME_WIDTH,
    canvas.height / GAME_HEIGHT
  );

  ctx.scale(dpr, dpr);
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
  ctx.scale(scale, scale);

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

// Input scaling example
canvas.addEventListener("pointerdown", e => {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width) / scale;
  const y = (e.clientY - rect.top) * (canvas.height / rect.height) / scale;

  console.log("Scaled input:", x, y);
});
