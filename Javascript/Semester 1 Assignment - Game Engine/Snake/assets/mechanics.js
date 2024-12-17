let grid;
let snakeLength;
let spawnNewSegment = false;
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
    frameDelay = 500;
    snakeLength = 0;
    let head = new SnakeHead(20, "assets/sprites/snakeHead.png", "0", 10, 10, 10);
    head.setIdle(jsonData.snakeHeadUp);
    entities.push(head);
}
function update(){
    if(spawnNewSegment){
        snakeLength += 1;
        let newId = snakeLength.toString();
        let body = new SnakeBody(20, "assets/sprites/snakeBody.png", newId, 10, 10, 10);
        body.setIdle(jsonData.snakeBodyUp);
        entities.push(body);
        spawnNewSegment = false;
    }
}
//Load in JSON file
function addFileToLoad(){
    fileToLoad = 'assets/data.json';
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
        if(toX > 19) toX = 19;
        if(toY > 19) toY = 19;
        if(toX < 0) toX = 0;
        if(toY < 0) toY = 0;
        if(!(this.gridX == toX && this.gridY == toY)){
            grid[this.gridX][this.gridY] = null;
            this.prevGridX = this.gridX;
            this.prevGridY = this.gridY;
            this.gridX = toX;
            this.gridY = toY;  
            grid[this.gridX,this.gridX] = this;
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
        spawnNewSegment = true;
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
            if(entities[e].segmentNo == this.segmentNo -1){
                this.placeInGrid(entities[e].prevGridX, entities[e].prevGridY);
            }
        }
    }
}