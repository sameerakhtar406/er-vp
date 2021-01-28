//Create variables here
var dog,dogImg,dogImg1; var database; 
var foodS,foodStock;
var fedTime,lastFed
var feed,addFood 
var foodObj

function preload(){ 
  dogImg=loadImage("dogImg.png"); 
  dogImg1=loadImage("dogImg1.png"); 
} 
  //Function to set initial environment 

  function setup() { 
  database=firebase.database(); 
  createCanvas(1000,400); 

  foodObj=new Food()

  foodStock=database.ref('Food'); 
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150); 
  dog.addImage(dogImg); 
  dog.scale=0.15; 

  
  //fedTime=database.ref('FeedTime'); 
  //fedTime.on("value", function(data){ 
  //lastFed=data.val();
  //});

  feed=createButton("Feed the dog"); 
  feed. position (700,95); 
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food"); 
  addFood. position(800,95); 
  addFood.mousePressed(addFoods);
 } 
 
function draw() { 
background(46,139,87); 
foodObj.display();

fedTime=database.ref('LastFed');
fedTime.on("value",function(data){
  lastFed=data.val();
});

//if(keyWentDown(UP_ARROW)){ 
//writeStock(foodS); dog.addImage(dogImg1);  } 

fill(255,255,254);
textSize(15);
if(lastFed>=12){
text("Last Feed : "+ lastFed%12 + " PM", 350,30);
}else if(lastFed==0){
text("Last Feed : 12 AM", 350, 38);
}else{
text("Last Feed : "+ lastFed + " AM", 350, 30);
}
drawSprites(); 
} 
 
  function readStock(data){ 
  foodS=data.val(); 
  foodObj.updateFoodstock(foodS);
} 
//function to update food stock and last fed time
function feedDog(){
  dog.addImage(dogImg1);
  
  foodobj.updateFoodstock(foodObj.getFoodStock()-1);
  database.ref("/").update({ 
  Food: foodObj.getFoodStock(),
  FeedTime:hour()
  })
  }
  //function to add food in stock 
  function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
})
}
