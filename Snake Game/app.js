const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const boxSize = 20;
const canvasSize = canvas.width / boxSize;

let snake = [{ x: 0, y: 0 }];
let food = { x: 0, y: 0 };
let direction = 'right';
let score = 0;

function generateFood() {
  food.x = Math.floor(Math.random() * canvasSize) * boxSize;
  food.y = Math.floor(Math.random() * canvasSize) * boxSize;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  // Draw snake
  ctx.fillStyle = 'green';
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
  });

  // Move snake
  const head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case 'up':
      head.y -= boxSize;
      break;
    case 'down':
      head.y += boxSize;
      break;
    case 'left':
      head.x -= boxSize;
      break;
    case 'right':
      head.x += boxSize;
      break;
  }
  snake.unshift(head);

  // Check collision with food
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }

  // Check collision with walls
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    clearInterval(gameLoop);
    alert('Game Over. Your Score: ' + score);
  }

  // Check collision with itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(gameLoop);
      alert('Game Over. Your Score: ' + score);
      break;
    }
}

  // Draw score
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 30);
}

function handleKeyPress(event) {
  const key = event.key;
  if (key === 'ArrowUp' && direction !== 'down') {
    direction = 'up';
  } else if (key === 'ArrowDown' && direction !== 'up') {
    direction = 'down';
  } else if (key === 'ArrowLeft' && direction !== 'right') {
    direction = 'left';
  } else if (key === 'ArrowRight' && direction !== 'left') {
    direction = 'right';
  }
}

generateFood();
let gameLoop = setInterval(draw, 150);
document.addEventListener('keydown', handleKeyPress);
