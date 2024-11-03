$(document).ready(loadData);
let filesToLoad;
let jsonData;
let lastInput = "";
//Code to be executed when page is loaded
function loadData(){
    const event = new Event("build");
    addFileToLoad();
    
    fetch(fileToLoad)
    .then((response) => response.json())
    .then((json) => {
        console.log("Data loaded");
        jsonData = json;
        main()
    });
}
//Code to be executed when json data is loaded
function main(){
    document.getElementById("a_button").onclick = aButtonClicked;
    document.getElementById("b_button").onclick = bButtonClicked;
    document.getElementById("left_button").onclick = leftButtonClicked;
    document.getElementById("right_button").onclick = rightButtonClicked;
    document.getElementById("up_button").onclick = upButtonClicked;
    document.getElementById("down_button").onclick = downButtonClicked;
    start();   
    updateLoop();
}
let entities = [];
//Code to be executed every Xms
function updateLoop(){
    handleInput();

    update();
    entityUpdate();

    setTimeout(updateLoop, 100);
}
//Input Handling
function handleInput(){
    switch(lastInput){
        case "":
            return;
        case "A":
            console.log("A");
            for(let e in entities){
                entities[e].handleAInput();
            }
            break;
        case "B":
            console.log("B");
            for(let e in entities){
                entities[e].handleBInput();
            }
            break;
        case "Left":
            console.log("Left");
            for(let e in entities){
                entities[e].handleLeftInput();
            }
            break;
        case "Right":
            console.log("Right");
            for(let e in entities){
                entities[e].handleRightInput();
            }
            break;
        case "Up":
            console.log("Up");
            for(let e in entities){
                entities[e].handleUpInput();
            }
            break;
        case "Down":
            console.log("Down");
            for(let e in entities){
                entities[e].handleDownInput();
            }
            break;      
    }
    lastInput = "";
}
function aButtonClicked(){
    lastInput = "A";
}
function bButtonClicked(){
    lastInput = "B";
}
function leftButtonClicked(){
    lastInput = "Left";
}
function rightButtonClicked(){
    lastInput = "Right";
}
function upButtonClicked(){ 
    lastInput = "Up";
}
function downButtonClicked(){   
    lastInput = "Down";
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
    /*
    place(){
        this.positionX = this.positionX % (400 - this.height);
        this.positionY = this.positionY % (400 - this.height);
        if(this.positionX < 0){
            this.positionX = (400 - this.height) + this.positionX
        }
        if(this.positionY < 0){
            this.positionY = (400 - this.height) + this.positionY
        }
        let entity = this.getElement();
        entity.style.left = `${this.positionX}px`;
        entity.style.top = `${this.positionY}px`;
    }
    */
    place(){
        if(this.positionX < 0){
            this.positionX = 0;
        }
        if(this.positionY < 0){
            this.positionY = 0;
        }
        if(this.positionX > (400 - this.height)){
            this.positionX = (400 - this.height)
        }
        if(this.positionY > (400 - this.height)){
            this.positionY = (400 - this.height);
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
    handleAInput(){}
    handleBInput(){}
    handleLeftInput(){}
    handleRightInput(){}
    handleUpInput(){}
    handleDownInput(){}
};