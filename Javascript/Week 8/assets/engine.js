$(document).ready(main);
//Code to be executed when the page is loaded
function main(){
    start();   
    updateLoop();
}
let entities = [];
//Code to be executed every Xms
function updateLoop(){

    update();
    entityUpdate();

    setTimeout(updateLoop, 100);
}
function entityUpdate(){
    for(e in entities){
        entities[e].update();
    } 
}
class Entity{
    positionX;
    positionY;
    height;
    imageUrl;
    id;
    constructor(height, imageUrl, id, x, y){
        this.positionX = x;
        this.positionY = y;
        this.height = height;
        this.imageUrl = imageUrl;
        this.id = id;
        let screen = $("#screen");
        let entity = document.createElement("div");
        entity.classList.add("entity");
        entity.id = this.id;
        let sprite = document.createElement("img");
        sprite.src = imageUrl;
        sprite.style.height = `${this.height}px`;
        entity.style.left = `${this.positionX}px`;
        entity.style.top = `${this.positionY}px`;
        entity.append(sprite);
        screen.append(entity);
    }
    update(){}
    movePosition(x,y){
        this.positionX += x;
        this.positionY += y;
        this.place();
    }
    setPosition(x,y){
        this.positionX = x;
        this.positionY = y;
        this.place();
    }
    place(){
        this.positionX = this.positionX % 400;
        this.positionY = this.positionY % 400;
        if(this.positionX < 0){
            this.positionX = 400 + this.positionX
        }
        if(this.positionY < 0){
            this.positionY = 400 + this.positionY
        }
        let entity = this.getElement();
        entity.style.left = `${this.positionX}px`;
        entity.style.top = `${this.positionY}px`;
    }
    getElement(){
        return document.getElementById(this.id);
    }   
};