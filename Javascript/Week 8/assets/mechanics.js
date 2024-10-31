function start(){
    for(i = 0; i < 5; i++){
        let e = new Test(Math.floor(Math.random() * 100), "assets/sprites/placeholder.png", "test" + i, 200, 200, Math.floor(Math.random() * 30));
        entities.push(e);
    }

    document.getElementById("button").onclick = onClick;

}
function update(){

}
function onClick(){
    let e = new Test(Math.floor(Math.random() * 100), "assets/sprites/placeholder.png", "test" + i, 200, 200, Math.floor(Math.random() * 30));
    entities.push(e);
    i++;
    console.log("added guy");
}

let i = 0;

class Test extends Entity{
    moveSpd;
    constructor(height, imageUrl, id, x, y, moveSpd){
        super(height, imageUrl, id, x, y);
        this.moveSpd = moveSpd;
    }
    update(){
        this.moveRandomly();
    }
    moveRandomly(){
        let moveX = Math.round(Math.random() * 2 - 1) * this.moveSpd;
        let moveY = Math.round(Math.random() * 2 - 1) * this.moveSpd;
        this.movePosition(moveX, moveY);
    }
}