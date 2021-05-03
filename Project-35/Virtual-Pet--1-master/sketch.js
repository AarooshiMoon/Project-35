//Create variables here
var dog,happyDog;
var database
var foodS, foodStock;
var dogImage,happyDogImage;

function preload()
{
	//load images here
  dogImage=loadImage("images/dogImg.png");
  happyDogImage=loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(500,500);

  database=firebase.database();
   
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


  dog=createSprite(280,220,10,10);
  dog.addImage(dogImage);
  dog.scale=0.3

  
  
}


function draw() {  
  background(46,139,87);

  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("yellow");
  stroke("black");
  text("Food Remaining : "+ foodS,160,50);

  fill("black");
  textSize(15);
  text("NOTE : Press the UP_ARROW key to feed Drago milk!!",80,400);
  

}

function readStock(data){
  foodS=data.val();

}

function writeStock(x){
  
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}
