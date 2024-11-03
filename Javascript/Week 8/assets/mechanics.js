function start(){
    let e = new Test(100, "assets/sprites/animation/PlayerWalkDown.png", "test", 200, 200, 10);
    e.setIdle(jsonData.playerWalk);
    entities.push(e);
}
function update(){
}
function addFileToLoad(){
    fileToLoad = 'assets/data.json'
}
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
    handleBInput(){
        this.pushAnim(jsonData.playerDodge);
    }
}