var ship, gameState, enemyship, score, laser, enemyShipGroup, lives, extraLife, life, life_img;
var ship_img, enemyship_img, laser_img, background_img, explosionSound, laserSound, explosionSound2;
function preload() {
  ship_img = loadImage("sprites/ship.png");
  enemyship_img = loadImage("sprites/enemyship.png");
  laser_img = loadImage("sprites/laser.png");
  background_img = loadImage("sprites/background.jpg");
  explosionSound = loadSound("sprites/explosion.wav");
  explosionSound2 = loadSound("sprites/explosion(2).wav")
  laserSound = loadSound("sprites/tir.mp3");
  life_img = loadImage("sprites/heartpre.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  gameState = "play";
  ship = createSprite(width/2,height-50,50,50);
  ship.addImage("ship",ship_img);
  ship.scale = 1.5;
  enemyShipGroup = createGroup();
  score = 0;
  lives = 3;
  extraLife = 0;
  //background_img
}

function draw() {
  background(background_img);
  if (gameState === "play") {


  if (keyDown(LEFT_ARROW)) {
    ship.x -= 8;
  } 
  if(keyDown(RIGHT_ARROW)) {
    ship.x += 8;
  }
  if (keyWentDown(UP_ARROW) || touches.length > 0) {
    laser = createSprite(ship.x,ship.y - 50,10,50);
    laser.addImage("laser", laser_img);
    laser.velocityY = -5;
    laser.scale = 0.5;
    laser.lifetime = 500;
    laserSound.play();
    touches = [];
  }
  createEnemy();
  
  if(enemyShipGroup.isTouching(laser)) {
    enemyShipGroup.destroyEach();
    score += 100;
    explosionSound.play();
    extraLife = Math.round(random(1,10));
    if (extraLife === 10) {
      lives += 1;
      life = createSprite(width/2,height/2,10,10);
      life.addImage("life",life_img);
      life.lifetime = 20;
    }
  }
  

  if (enemyShipGroup.isTouching(ship)) { 
      lives -= 1; 
      ship.destroy();
      explosionSound2.play();
      ship = createSprite(width/2,height-50,50,50);
      ship.addImage("ship",ship_img);
      ship.scale = 1.25;
      
    //console.log(lives); 
  } 
  if (lives === 0) {
    gameState = "end"
  }
  drawSprites();

}

if (gameState === "end") {
  textSize(80);
  fill("yellow");
  text("Game Over", width/2-100, height/2);
  text("Total score: " + score, width/2-150, height/2+100);
}
  
    textSize(40);
    fill("red");
    text("lives: " + lives,width - 300, 50);
    text("score: " + score, width - 300,100);
}

function createEnemy() {

  if (frameCount%60 === 0 && gameState === "play") {
    enemyship = createSprite(random(50,width-50),0,20,20)
    enemyship.addImage("enemy",enemyship_img);
    enemyship.velocityY = 8 + score/500;
    //console.log(enemyship.velocityY);
    enemyship.lifetime = 500;
    enemyShipGroup.add(enemyship);
  }
}