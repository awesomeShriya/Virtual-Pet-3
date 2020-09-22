class Food{    
constructor(){
   this.image= loadImage("images/Milk.png");
        this.foodStock=0;
        this.lastFed;
}

getFoodStock(){
return this.foodStock;
}
updateFoodStock(foodStock){
this.foodStock=foodStock;
}
deductFood(){
    if(this.foodStock>0){
        this.foodStock=this.foodStock-1;
    }
}

bedroom(){
    background(bedroom,550,500);
}

garden(){
    background(garden,550,500);
}

washroom(){
    background(washroom,550,500);
}

display(){
    background("green");
    fill("white");
    textSize(15);
    if(lastFed>=12)
    text("Last Feed: "+lastFed%12+"pm",50,30);
    else if(lastFed===0){
        text("Last Feed:12 AM", 50,30)
    }
        else{
            text("Last Feed"+lastFed+"am",50,30);
        }
    
var x=70, y=100;

imageMode(CENTER);
image(this.image,720,220,70,70);

if(this.foodStock!==0){
    for(var i=0;i<this.foodStock;i++){
        if(i%10===0){
            x=80;
            y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;
    }
  }
}

}