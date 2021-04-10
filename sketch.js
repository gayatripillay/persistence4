
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint =Matter.Constraint;
var boy ,rope  ;
var boyImage,stoneImage,ropeImage;
var ropeSprite,boySprite,stonesGroup,boy2;

function preload()
{
  boyImage = loadImage("sprites/boy3.png");
	stoneImage = loadImage("sprites/rock2.png");
  ropeImage = loadImage("sprites/rope.png");
  backgroundImage=loadImage("sprites/mountain3.jpg")
  balloonImage = loadImage("sprites/balloon.png");
  airplaneImage = loadImage("sprites/plane.png");
  FallingBoyImage = loadImage("sprites/boy2.png");
}

function setup() {
	createCanvas(1200, 1000);
  rectMode(CENTER);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
  ground = new Ground(600,height,1200,20);
  boy=new Boy(600,height-100);
  rope=new Rope(boy.body,{ x: 600, y: 150 })

   //Create the Sprites Here.
  boySprite = createSprite(600,height-100,20,50);
  boySprite.addImage("boyClimbing",boyImage);
  boySprite.addImage("boy2",FallingBoyImage);

  ropeSprite = createSprite(600,480,20,50);
  ropeSprite.addImage("rope",ropeImage);
  ropeSprite.scale =0.2; 
  
  
 
  //create Stone Groups
  stonesGroup = createGroup();
  balloonsGroup= createGroup();
  airplanesGroup= createGroup();
  Engine.run(engine);

}
function draw() {
  
  background(backgroundImage);
  Engine.update(engine);
  rope.display();
 
 boySprite.x= boy.body.position.x 
 boySprite.y= boy.body.position.y 

 if(boySprite.isTouching(stonesGroup)){
  rope.fly();
  boySprite.changeAnimation("boy2",FallingBoyImage);
}

if(boySprite.isTouching(balloonsGroup)){
  rope.fly();
  boySprite.changeAnimation("boy2",FallingBoyImage);
}

if(boySprite.isTouching(airplanesGroup)){
  rope.fly();
  boySprite.changeAnimation("boy2",FallingBoyImage);
}


 

 spawnStones();
 spawnBalloons();
 spawnAirplanes();

 drawSprites();
}



function spawnStones(){
  if (frameCount % 120 === 0) {
      var stone = createSprite(0,130,40,10);
      stone.y = Math.round(random(50,height-200));
      stone.addImage(stoneImage);
      stone.scale = 0.2;
      stone.velocityX = 3;
      stone.lifetime = 500;
     
      //adjust the depth
      boySprite.depth = stone.depth;
      boySprite.depth = boySprite.depth + 1;
      ropeSprite.depth = boySprite.depth + 1;


      stonesGroup.add(stone);
  }
}


function spawnBalloons(){
  if (frameCount % 120 === 0) {
      var balloon = createSprite(1070,10,10,230);
      balloon.y = Math.round(random(50,height-200));
      balloon.addImage(balloonImage);
      balloon.scale = 0.2;
      balloon.velocityX = -3;
      balloon.lifetime = 500;
     
      //adjust the depth
      boySprite.depth = balloon.depth;
      boySprite.depth = boySprite.depth + 1;
      ropeSprite.depth = boySprite.depth + 1;


      balloonsGroup.add(balloon);
  }
}


function spawnAirplanes(){
  if (frameCount % 120 === 0) {
      var airplane = createSprite(1040,20,10,40);
      airplane.y = Math.round(random(50,height-200));
      airplane.addImage(airplaneImage);
      airplane.scale = 0.2;
      airplane.velocityX = -5;
      airplane.lifetime = 500;
     
      //adjust the depth
      boySprite.depth = airplane.depth;
      boySprite.depth = boySprite.depth + 1;
      ropeSprite.depth = boySprite.depth + 1;


      airplanesGroup.add(airplane);
  }
}

function keyPressed() 
{ if(keyCode === UP_ARROW) 
  { console.log("up arrow pressed") 
  rope.reduceLength();
 } else if(keyCode === DOWN_ARROW) 
{ console.log("down arrow pressed")
 rope.increaseLength(); 
} }