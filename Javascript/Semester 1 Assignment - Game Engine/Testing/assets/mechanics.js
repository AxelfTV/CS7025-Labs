function start(){
    let e = new Test(100, "assets/sprites/animation/PlayerWalkDown.png", "test", 200, 200, 10);
    e.setIdle(jsonData.playerWalk);
    entities.push(e);

    let f = new Test(100, "assets/sprites/animation/Dodge.png", "shadow", 50, 200, 10);
    entities.push(f);
}
function update(){
}
function addFileToLoad(){
    fileToLoad = 'assets/data.json';
}
class Test extends Entity{
    moveSpd;
    constructor(height, imageUrl, id, x, y, moveSpd){
        super(height, imageUrl, id, x, y);
        this.moveSpd = moveSpd;
    }
    update(){
        
    }
    moveRandomly(){
        let moveX = Math.round(Math.random() * 2 - 1) * this.moveSpd;
        let moveY = Math.round(Math.random() * 2 - 1) * this.moveSpd;
        this.movePosition(moveX, moveY);
    }
    handleAInput(){
        this.destroy();
    }
    handleBInput(){
        this.pushAnim(jsonData.playerDodge);
    }
    handleLeftInput(){
        this.movePosition(-10,0);
    }
    handleRightInput(){
        this.movePosition(10,0);
    }
    handleUpInput(){
        this.movePosition(0,-10);
    }
    handleDownInput(){
        this.movePosition(0,10);
    }
}