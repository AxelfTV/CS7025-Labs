let gridTable;
let playerTurn = 1;

function start(){
    gridTable = [[createGridElement(0),createGridElement(1),createGridElement(2)],
                [createGridElement(3),createGridElement(4),createGridElement(5)],
                [createGridElement(6),createGridElement(7),createGridElement(8)]];
    let s = new selector(100,"assets/sprites/selector.png","selector",150,150)
    entities.push(s);
}
function update(){
}
function addFileToLoad(){
    fileToLoad = 'assets/data.json'
}
function createGridElement(i){
    let space = new gridSpace(100,"assets/sprites/emptyTile.png",`${i}`,(i %3)*100 + 50,Math.floor(i/3)*100 + 50);
    entities.push(space);
    return space;
}
function resetGame(){
    for(let e in entities){
        entities[e].destroy();
    }
    playerTurn = 1;
    start();
}
class gridSpace extends Entity{
    value = "";
    constructor(height, imageUrl, id, x, y){
        super(height, imageUrl, id, x, y);
    }
    update(){

    }
    tryPlaceObject(){
        console.log(playerTurn);
        if(playerTurn == 1){
            if(this.tryPlaceX()){
                playerTurn = 2;
            }
        }
        else{
            if(this.tryPlaceO()){
                playerTurn = 1;
            }           
        }
    }
    tryPlaceX(){
        if(this.value == ""){
            this.setIdle(["assets/sprites/xTile.png"])
            this.value = "X";
            console.log("placed X");
            return true;
        }
        return false;
    }
    tryPlaceO(){
        if(this.value == ""){
            this.setIdle(["assets/sprites/oTile.png"])
            this.value = "O";
            console.log("placed O");
            return true;
        }
        return false;
    }
}
class selector extends Entity{
    gridPosition = [1,1];
    constructor(height, imageUrl, id, x, y){
        super(height, imageUrl, id, x, y);
    }
    update(){}
    setGridPosition(){
        this.setPosition(this.gridPosition[0] * 100 + 50, this.gridPosition[1] * 100 + 50);
    }
    handleAInput(){
        gridTable[this.gridPosition[1]][this.gridPosition[0]].tryPlaceObject();
    }
    handleBInput(){
        resetGame();
    }
    handleUpInput(){
        if(this.gridPosition[1] > 0){
            this.gridPosition[1] = this.gridPosition[1] - 1;
            this.setGridPosition();
        }
    }
    handleDownInput(){
        if(this.gridPosition[1] < 2){
            this.gridPosition[1] = this.gridPosition[1] + 1;
            this.setGridPosition();
        }
    }
    handleLeftInput(){
        if(this.gridPosition[0] > 0){
            this.gridPosition[0] = this.gridPosition[0] - 1;
            this.setGridPosition();
        }
    }
    handleRightInput(){
        if(this.gridPosition[0] < 2){
            this.gridPosition[0] = this.gridPosition[0] + 1;
            this.setGridPosition();
        }
    }
}
