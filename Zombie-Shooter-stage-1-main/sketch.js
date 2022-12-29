var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg
var zombieGroup
var bulletGroup
var bullets=100
var score=0
var life=3
var heart1
var heart2
var heart3
var heart1Image
var heart2Image
var heart3Image
var gameState="fight"

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg=loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  heart1Image=loadImage("assets/heart_1.png")
  heart2Image=loadImage("assets/heart_2.png")
  heart3Image=loadImage("assets/heart_3.png")



}

function setup() {

  
  createCanvas(windowWidth,windowHeight);
  zombieGroup=new Group();
 bulletGroup=new Group();
  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
  
   heart1=createSprite(displayWidth-150,40,20,20)
   heart1.addImage(heart1Image)
   heart1.scale=0.5
   heart1.visible=false

   heart2=createSprite(displayWidth-150,40,20,20)
   heart2.addImage(heart2Image)
   heart2.scale=0.5
   heart2.visible=false

   heart3=createSprite(displayWidth-170,40,20,20)
   heart3.addImage(heart3Image)
   heart3.scale=0.5
   heart3.visible=true




}

function draw() {
  background(0); 
  if(gameState==="fight"){
    if(keyDown("UP_ARROW")||touches.length>0){
      player.y = player.y-30
    }  
    if(keyDown("DOWN_ARROW")||touches.length>0){
     player.y = player.y+30
    }
    if ( keyWentDown("space")){
      bullet=createSprite(displayWidth-1150,player.y-27,20,10)
      bullet.velocityX=20
      player.addImage(shooter_shooting)
      player.depth=bullet.depth
      player.depth=player.depth+1
      bulletGroup.add(bullet)
      bullets=bullets-1
    }
    
    //release bullets and change the image of shooter to shooting position when space is pressed
    if(zombieGroup.isTouching(bulletGroup)){
      for(i=0;i<zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy();
        bulletGroup.destroyEach(); 
        score=score+2
      }
    }
    }
    if(zombieGroup.isTouching(player)){
      for(i=0;i<zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(player)){
       
        zombieGroup.destroyEach(); 
        life=life-1
      }
    
    }
    }
    //player goes back to original standing image once we stop pressing the space bar
    else if(keyWentUp("space")){
      player.addImage(shooterImg)
    }
    spwanzombie();
    
    if (life ===3  ){
    heart3.visible=true
    }
    if(life===2){
      heart2.visible=true
      heart1.visible=false
      heart3.visible=false
    }
    if(life===1){
      heart1.visible=true
      heart2.visible=false
      heart3.visible=false
    }
    if(life===0){
      heart1.visible=false
      heart2.visible=false
      
      zombieGroup.destroyEach()
      player.destroy()
      bulletGroup.destroyEach()
     gameState="Lost"
    } 
  }





 

drawSprites();
textSize(20);
fill("white");
text("Score: "+score,displayWidth-230,displayHeight/2-280)
text("Bullets: "+bullets,displayWidth-230,displayHeight/2-250)
if(gameState==="Lost"){
  text("game over",displayWidth-300,displayHeight/2)
}
}
function spwanzombie(){
  if (frameCount%50===0)
  {
  zombie=createSprite(random(500,1100),random(100,500),40,40)
  zombie.addImage(zombieImg)
  zombie.scale=0.2
  zombie.velocityX=-3
  zombie.lifetime=400
  zombieGroup.add(zombie)
  }
}