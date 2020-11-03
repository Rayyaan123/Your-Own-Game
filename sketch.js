var mario, marioRunning, marioJump;
var mariobg, mariobgImage;
var coin, coinImage;
var goomba, goombaImage;
var ground;
var score = 0;


function preload(){
    
    mariobgImage = loadImage("marioworld.png");
    
    marioRunning = loadAnimation("mariorun1.png","mariorun2.png","mariorun3.png");

    marioJump = loadAnimation("mariojump.png");

    coinImage = loadImage("realcoin.png");

    goombaImage = loadImage("goombareal.png");


}

function setup(){
  createCanvas(300,300);

  

  mariobg = createSprite(225,108,0,0);
  mariobg.addImage(mariobgImage);
  mariobg.scale = 1.0;

  mario = createSprite(80,164,0,0)
  mario.addAnimation("running",marioRunning);
  mario.scale = 0.16;

  ground=createSprite(150,187,300,10);

  coinGroup = createGroup();
  goombaGroup = createGroup();

  
  mario.setCollider("rectangle",0,0,150,175);
  mario.debug = true

  
}

function draw(){

  drawSprites();

  


  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+score,150,50);

  ground.visible = false;

  mariobg.velocityX = -2.5

  if (mariobg.x < 100){
      mariobg.x = mariobg.width/2;
    }

  mario.velocityY = mario.velocityY + 0.8
  mario.collide(ground);

  if(keyDown("space")&& mario.y >= 163.5) {
        mario.velocityY = -12;
        
    }

  if(mario.y>164){
    mario.changeAnimation("jump",marioJump);
  }

  

  if(World.frameCount%120===0){
    coin = createSprite(400,200,20,20);
    coin.scale = 0.05;
    coin.addImage("coin",coinImage);
    coin.y = Math.round(random(50,108));
    coin.velocityX = -2.5;
    coin.setLifetime = 100;
    coinGroup.add(coin);
    

  }
  
  if (frameCount % 300 === 0){
    goomba = createSprite(250,170,10,40);
    goomba.addImage("goomba",goombaImage);
    goomba.velocityX = -2.5
    goomba.scale = 0.05;
    goomba.lifetime = 300;
    goombaGroup.add(goomba);
    }



  if(mario.isTouching(coinGroup)){
      coinGroup.destroyEach();
      score = score + 1;
      }

  if(mario.isTouching(goombaGroup)){
      mariobg.setVelocity(0,0);
      coinGroup.setVelocity(0,0);
      stroke("black");
      textSize(40);
      fill("black");
      text("Game Over",150,150);
    }
}

