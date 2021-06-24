var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var pinkcycler1Img,pinkcycler2Img;
var yellowcycler1Img,yellowcycler2Img;
var redcycler1Img,redcycler2Img;
var gameoverImg,cycleBell;

var PinkCG, YellowCG,RedCG;  

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameover, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  pinkcycler1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  pinkcycler2Img = loadAnimation("images/opponent3.png");
  
  yellowcycler1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  yellowcycler2Img = loadAnimation("images/opponent6.png");
  
  redcycler1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  redcycler2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameoverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(displayWidth,displayHeight);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,displayHeight/2);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//set collider for mainCyclist
mainCyclist.setCollider("rectangle",0,0,40,40);
  
gameover = createSprite(displayHeight/2,displayWidth/2);
gameover.addImage(gameoverImg);
gameover.scale = 0.8;
gameover.visible = false;    
  
PinkCG = new Group();
RedCG = new Group();
YellowCG = new Group();  
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
    
    distance = distance + Math.round(getFrameRate(50));
    path.velocityX = -(6 + 2*distance/150);

    camera.position.x = mainCyclist.x
    camera.position.y = displayHeight/2
    
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    if(keyDown("space")){
     cycleBell.play();
  }
    
    var DifferetCycles = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0){
    if ( DifferetCycles == 1) {
      PinkCyclists();
    } else if (DifferetCycles == 2) {
      YellowCyclists();
    } else {
      RedCyclists();
    }
  }
    
  
  if(RedCG.isTouching(mainCyclist)){
    gameState = END
    player1.velocityY = 0;
    player1.addAnimation("badopponentPlayer1",redcycler1Img);
  }
  
  if(YellowCG.isTouching(mainCyclist)){
    gameState = END
    player2.velocityY = 0;
    player2.addAnimation("badopponentPlayer2",yellowcycler1Img);
}
    if(PinkCG.isTouching(mainCyclist)){
    gameState = END
    player3.velocityY = 0;
    player3.addAnimation("badopponentPlayer3",pinkcycler1Img);
}

} else if (gameState === END) {
  
  gameover.visible = true;
  
  textSize(20);
    fill(255);
    text("Oh o press R to restart", 200,200);
  
 path.velocityX = 0;
 mainCyclist.velocityY = 0;
 mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
PinkCG.setVelocityXEach = (0);
PinkCG.setLifetime = (-2); 
  
RedCG.setVelocityXEach = (0);
RedCG.setLifetime = (-3);
  
YellowCG.setVelocityXEach = (0);
YellowCG.setLifetime = (-3);
  
  if(keyDown("r")){
    reset();
  }
}
}
     
function RedCyclists(){
  player1 = createSprite(displayWidth,Math.round(random(50,250),10,10));
  player1.scale = 0.06;
  player1.addAnimation("cycling",redcycler1Img);
  player1.setLifetime = 170;
  player1.velocityX = -(6 + 2*distance/150);
  RedCG.add(player1);
}
 function YellowCyclists(){
  player2 = createSprite(displayWidth,Math.round(random(50,250),10,10));
  player2.scale = 0.06;
  player2.addAnimation("cycling",yellowcycler1Img);
  player2.setLifetime = 170;
  player2.velocityX = -(6 + 2*distance/150);
  YellowCG.add(player2);
}
function PinkCyclists(){
  player3 = createSprite(displayWidth,Math.round(random(50,250),10,10));
  player3.scale = 0.06;
  player3.addAnimation("cycling",pinkcycler1Img);
  player3.setLifetime = 170;
  player3.velocityX = -(6 + 2*distance/150);
  PinkCG.add(player3);
}
function reset(){
  gameState = PLAY;
  gameover.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  PinkCG.destroyEach();
  YellowCG.destroyEach();
  RedCG.destroyEach();
  
  distance = 0;
}