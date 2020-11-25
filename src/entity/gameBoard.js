import EntityPositionObject from "./entityPositionObject";

class GameBoard { 
    
    //properties
    gameAreaPostion = {top: 0, bottom: 0, left: 0, right: 0};
    playerPosition = {top: 0, bottom: 0, left: 0, right: 0};
    /**
     * @type EntityPositionObject
     */
    enemyPositionSet = [];
    /**
     * @type EntityPositionObject
     */
    itemPositionsSet = [];


    constructor(){
        
    }

}



export default GameBoard;