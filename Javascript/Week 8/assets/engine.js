$(document).ready(loadData);
let filesToLoad;
let jsonData;
//Code to be executed when page is loaded
function loadData(){
    const event = new Event("build");
    addFileToLoad();
    
    fetch(fileToLoad)
    .then((response) => response.json())
    .then((json) => {
        console.log("success");
        jsonData = json;
        main()
    });
}
//Code to be executed when json data is loaded
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
//Entities updated after update function
function entityUpdate(){
    for(let e in entities){
        entities[e].update();
        entities[e].animate();
    } 
}
class Entity{
    positionX;
    positionY;
    height;
    idleAnim;
    id;
    animQueue;
    constructor(height, imageUrl, id, x, y){
        this.positionX = x;
        this.positionY = y;
        this.height = height;
        this.idleAnim = [imageUrl];
        this.id = id;
        this.animQueue = [];
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
    animate(){
        if(this.animQueue.length == 0){
            for(let s in this.idleAnim){
                this.animQueue.push(this.idleAnim[s])
            }
        }
        let img = this.getElement().getElementsByTagName("img")[0];
        let sprite = this.animQueue.shift();
        if(img.src != sprite){
            img.src = sprite;
        }
    }
    setIdle(idleArray){
        this.idleAnim = idleArray;
    }
    pushAnim(animArray){
        for(let s in animArray){
            this.animQueue.push(animArray[s]);
        }
    }  
};