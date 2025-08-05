//* board
let started = false;
var blockSize = 25;
var rows = 23;
var cols = 30;
var board, context;

let oversound = new Audio("./over.mp3");
oversound.loop = false;
let bgm = new Audio("./bg.mp3");
bgm.loop = true;

//* snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];
//* food
var foodX;
var foodY;
var gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); //!used for drawing on the board
  placeFood();

  let startMessage = document.getElementById("h");
  startMessage.innerText = "Press any key to start";
  startMessage.id = "start-msg";
  // document.body.appendChild(startMessage);

  document.addEventListener("keydown", (e) => {
    if (!started) {
      started = true;
      bgm.play().catch((err) => console.log("BGM failed to play:", err));
      setInterval(update, 150);

      if (startMessage) {
        startMessage.remove();
      }
    }
    changeDirection(e);
  });
};

update = () => {
  if (gameOver) return;
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);
  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }
  for (let i = snakeBody.length - 1; i >= 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillStyle = "lime";
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= cols * blockSize ||
    snakeY >= rows * blockSize
  ) {
    lose();
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      lose();
    }
  }
  // setInterval(update,95);
};

lose = () => {
  if (!gameOver) {
    gameOver = true;
    document.getElementById("heading").innerText =
      "Game Over !\n Ctrl+R to restart";
    bgm.pause();
    bgm.currentTime = 0;
    oversound.play();
  }
};

placeFood = () => {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
};

changeDirection = (e) => {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};
