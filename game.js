const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 360;
const GAME_HEIGHT = 640;

let lastTime = 0;
let box = { x: 50, y: 300, speed: 100 };

function resizeCanvas() {
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

