let grid;
let snakeLength;
let spawnNewSegment;
let isPickUp;
let isGameOver;
function start(){
    grid = [
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    ];
    frameDelay = 200;
    snakeLength = 0;
    spawnNewSegment = false;
    isGameOver = false;
    let head = new SnakeHead(20, "assets/sprites/snakeHead.png", "0", 10, 10, 10);
    head.setIdle(jsonData.snakeHeadUp);
    entities.push(head);

    spawnPickUp();
}
function update(){
    
    if(spawnNewSegment){
        spawnNewSnakeSegment();
        spawnNewSegment = false;
    }
    if(!isPickUp) spawnPickUp();
}
//Load in JSON file
function addFileToLoad(){
    fileToLoad = 'assets/data.json';
}
function spawnNewSnakeSegment(){
    snakeLength += 1;
    let newId = snakeLength.toString();
    let body = new SnakeBody(20, "assets/sprites/snakeBody.png", newId, 10, 10, 10);
    body.setIdle(jsonData.snakeBodyUp);
    entities.push(body);
    isPickUp = false;
}
function spawnPickUp(){
    let randX = Math.floor(Math.random() * 20);
    let randY = Math.floor(Math.random() * 20);
    if(grid[randX][randY] != null) return;
    let p = new PickUp(randX, randY);
    entities.push(p);
    grid[randX][randY] = p;
    isPickUp = true;
}
function gameOver(){
    console.log("game over");
    resetGame();
}
function countGrid(){
    let count = 0;
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 20; j++){
            if(grid[i][j] != null) count++;
        }
    }
    console.log(count);
}
class SnakePiece extends Entity{
    segmentNo;
    gridX;
    gridY;
    prevGridX;
    prevGridY;
    constructor(height, imageUrl, id, x, y){
        super(height, imageUrl, id, x*20, y*20);
        this.segmentNo = parseInt(id);
        this.gridX = x;
        this.gridY = y;
    }
    placeInGrid(x,y){
        
        let toX = x;
        let toY = y;
        if(toX > 19 || toY > 19 || toX < 0 || toY < 0){
            gameOver();
            return;
        } 
        if(!(this.gridX == toX && this.gridY == toY)){
            if(grid[toX][toY] != null && this.segmentNo == 0){
                let gridEntity = grid[toX][toY];
                if(gridEntity.segmentNo == "p") {
                    spawnNewSegment = true;
                    gridEntity.destroy();
                }
                else if(gridEntity.segmentNo != snakeLength) {
                    gameOver();
                    return;
                }
            }
            grid[this.gridX][this.gridY] = null;
            this.prevGridX = this.gridX;
            this.prevGridY = this.gridY;
            this.gridX = toX;
            this.gridY = toY;  
            grid[this.gridX][this.gridY] = this;
            this.setPosition(this.gridX*20,this.gridY*20);
        }    
    }
}
class SnakeHead extends SnakePiece{
    moveDirection = "up";
    constructor(height, imageUrl, id, x, y){
        super(height, imageUrl, id, x, y);
    }
    update(){
        switch(this.moveDirection){
            case "up":
                this.placeInGrid(this.gridX, this.gridY - 1)
                break;
            case "down":
                this.placeInGrid(this.gridX, this.gridY + 1)
                break;
            case "left":
                this.placeInGrid(this.gridX - 1, this.gridY)
                break;
            case "right":
                this.placeInGrid(this.gridX + 1, this.gridY)
                break;
        }
    }
    handleAInput(){
        
    }
    handleLeftInput(){
        if(this.moveDirection == "up" || this.moveDirection == "down"){
            this.moveDirection = "left";
        }     
    }
    handleRightInput(){
        if(this.moveDirection == "up" || this.moveDirection == "down"){
            this.moveDirection = "right";
        }  
    }
    handleUpInput(){
        if(this.moveDirection == "left" || this.moveDirection == "right"){
            this.moveDirection = "up";
        }  
    }
    handleDownInput(){
        if(this.moveDirection == "left" || this.moveDirection == "right"){
            this.moveDirection = "down";
        }  
    }
}
class SnakeBody extends SnakePiece{
    
    constructor(height, imageUrl, id, x, y){
        
        super(height, imageUrl, id, x, y);
    }
    update(){
        this.findPosition();
    }
    findPosition(){
        for(let e in entities){
            if(entities[e].segmentNo == this.segmentNo - 1){
                this.placeInGrid(entities[e].prevGridX, entities[e].prevGridY);
            }
        }
    }
}
class PickUp extends Entity{
    segmentNo = "p";
    constructor(x, y){
        super(20, "assets/sprites/pickUp.png", "p", x*20, y*20);
    }
    update(){};
    
}