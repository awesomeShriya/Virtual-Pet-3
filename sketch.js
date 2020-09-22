//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj, allFoods;
var changeState, readState;
var bedroom, garden, washroom;
var gameState;

function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
  bedroom=loadImage("virtual+pet+images/virtual pet images/Bedroom.png");
  garden=loadImage("virtual+pet+images/virtual pet images/Garden.png");
  washroom=loadImage("virtual+pet+images/virtual pet images/Washroom.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  foodObj=new Food();
  dog=createSprite(250,250,40,40);
  dog.addImage(dogImg);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('Food');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  readState=database.ref('gameState');
  readState.on("value",function(data){
  gameState=data.val();
  });
}

function draw() { 
  currentTime=hour();
  if(currentTime===(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime===(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed=4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }


  if(gameState!=="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
  }


  drawSprites();
}
  

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function addFoods(){
  if(addFood.mousePressed){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }
}

function feedDog(){
dog.addImage(happyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}
