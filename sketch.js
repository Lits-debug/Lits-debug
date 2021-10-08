var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg, restartimg;
var water, ship, helicopter, bomb;
var helicopterGroup, bombGroup;
var score = 0;



function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadImage("ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
  restartimg = loadImage("restart.png");
}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
 
   water = createSprite(500, 350);
    water.addImage(waterbg);
    water.velocityX = -2;
  
  //creating ship
 
   ship = createSprite(200,300);
   ship.addImage(shipimg);
   ship.scale = 0.3;
    

  //creating helicopter group
    
      helicopterGroup = new Group()

  //creating bomb group
  
    bombGroup = new Group();

     //ship.debug = "true";

}

function draw() {
  
  
  background(skybg);
  

  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);

    
  //gameState play
  if(gameState === PLAY){
    
    //increase score
    score = score + Math.round(frameCount/300);
    ship.x = mouseX;

    var edges = createEdgeSprites();
    ship.collide(edges);

    
    //Call user defined function
       
    spawnHelicopter();
    spawnBomb();
    
    if(bombGroup.isTouching(ship)){
       gameState = END;
    }
    
  }
  
  //gameState end
   else if(gameState === END){
    ship.addImage(restartimg);
    
   //water velocity becomes zero

   water.velocityX = 0

   //destroy Helicopter group

    helicopterGroup.destroyEach();

   //destroy bomb group
    bombGroup.destroyEach();
  
    }
  
 
 //for infinite background 
  if(water.position.x < 300){
   water.position.x = 400;
    }
    
    drawSprites(); 
  
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    
    helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);
  }
}

function spawnBomb(){

 // create bombs at random position
if(frameCount%210 == 0){
   bomb = createSprite(Math.round(random(100,700)),150, 40,80);
   bomb.addImage(bombimg);
   bomb.scale = 0.1;

   bomb.setVelocity(0,5);

   bombGroup.add(bomb);

}

 //use Math.random
}




