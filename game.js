const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Portrait virtual resolution
const PORTRAIT_W = 360;
const PORTRAIT_H = 640;

// Landscape virtual resolution
const LANDSCAPE_W = 640;
const LANDSCAPE_H = 360;

let GAME_WIDTH = PORTRAIT_W;
let GAME_HEIGHT = PORTRAIT_H;

let lastTime = 0;

// Demo object
let box = { x: 50, y: 150, speed: 120 };

function resizeCanvas() {
  const isLandscape = window.innerWidth > window.innerHeight;

  // Swap virtual resolution based on orientation
  if (isLandscape) {
    GAME_WIDTH = LANDSCAPE_W;
    GAME_HEIGHT = LANDSCAPE_H;
  } else {
    GAME_WIDTH = PORTRAIT_W;
    GAME_HEIGHT = PORTRAIT_H;
  }

  // Set canvas logical size
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;

  // Scale canvas to fit screen
  const scale = Math.min(
    window.innerWidth / GAME_WIDTH,
    window.innerHeight / GAME_HEIGHT
  );

  canvas.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function update(dt) {
  box.x += box.speed * dt;
  if (box.x > GAME_WIDTH) box.x = -50;
}

function draw() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = "red";
  ctx.fillRect(box.x, box.y, 50, 50);
}

function loop(timestamp) {
  const dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  update(dt);
  draw();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
