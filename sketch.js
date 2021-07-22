let player;
let bgImge;
let playerImge;
let obstacleImge;
let obstacles = [];

let wordClassifier;

function preload() {
  bgImge = loadImage("background.jpg");
  playerImge = loadImage("player.png");
  obstacleImge = loadImage("obstacle.jpg");

  let options = {
    probabilityThresholds: 0.85,
  };
  wordClassifier = ml5.soundClassifier("SpeechCommands18w", options);
}
function setup() {
  createCanvas(800, 400);
  player = new Player();
  wordClassifier.classify(heardWord);
}

function heardWord(error, results) {
  if (results[0].label === "up") player.jump();
}

function keyPressed() {
  if (key === " ") {
    player.jump();
  }
}
function draw() {
  if (random(1) < 0.01) {
    obstacles.push(new Obstacle());
  }

  background(bgImge);
  player.show();
  player.move();

  for (let obs of obstacles) {
    obs.show();
    obs.move();

    if (player.collided(obs) == true) {
      console.log("you loss game-over");
      noLoop();
    }
  }
}
