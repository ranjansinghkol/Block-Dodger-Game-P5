var player, playerImg;
var obs, obsImg, obsG, hitSound;
var gameOver, gameOverImg;

var PLAY = 1
var END = 0;
var gameState = PLAY;

var score = 0;

function preload() {
    playerImg = loadImage('assets/images/player.png');
    obsImg = loadImage('assets/images/obstacle.png');
    gameOverImg = loadImage('assets/images/gameOver.png');

    hitSound = loadSound('assets/sounds/hit.wav');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    player = createSprite(windowWidth / 2, windowHeight - 100);
    player.addImage(playerImg);

    gameOver = createSprite(windowWidth / 2, windowHeight / 2);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;
    gameOver.visible = false;

    obsG = new Group();

    score = 0;
}

function draw() {
    background(175, 238, 238);
    drawSprites();
    textSize(20);

    if (gameState == PLAY) {
        player.x = mouseX;

        score += parseInt(getFrameRate() / 20);

        createObstacles();

        if (player.isTouching(obsG)) {
            gameState = END;
            hitSound.play();
        }
    }
    if (gameState == END) {
        gameOver.visible = true;
        text("Tap to Restart", windowWidth / 2 - 50, windowHeight / 2 + 40);

        obsG.setLifetimeEach(-1);
        obsG.setVelocityYEach(0);

        if (mousePressedOver(gameOver) || touches.length > 0) {
            restart();
            touches = [];
        }
    }

    text("Score: " + score, 10, 20)
}

function createObstacles() {
    if (frameCount % 50 == 0) {
        obs = createSprite(random(50, windowHeight / 2), -75);
        obs.addImage(obsImg);
        obs.velocityY = 4;
        obs.depth = player.depth;
        player.depth++;
        obs.lifetime = 2000;
        obsG.add(obs);
    }
}

function restart() {
    gameState = PLAY;

    gameOver.visible = false;
    obsG.destroyEach();
    
    score = 0;
}
