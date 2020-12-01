import EnemyClass from "../entity/enemyClass";
import EntityPositionObject from "../entity/entityPositionObject";
class PositionHelper {

    /**
     * Generates a random postion
     * @param {{top: 0, bottom: 0, left: 0, right: 0}} gameAreaPosition 
     */
    static generateRandomPosition = (gameAreaPosition) => {
        console.log("Running: generateRandomPosition")
        let position = {top: 0, bottom: 0, left: 0, right: 0};
        let top = this.randomInteger(gameAreaPosition.top, gameAreaPosition.bottom);
        let left = this.randomInteger(gameAreaPosition.left, gameAreaPosition.right);

        // let top = Math.floor(Math.random() * gameAreaPosition.bottom) + gameAreaPosition.top;
        // let left = Math.floor(Math.random() * gameAreaPosition.right) + gameAreaPosition.left;

        position.top = top;
        position.left = left;
        position.bottom = top + 50;
        position.right = left + 50;
        
        return position;
    }

    /**
     * Checks if there is an entity at the requested location
     * @param {{top: 0, bottom: 0, left: 0, right: 0}} playerPosition 
     * @param {[EntityPositionObject]} enemyPostions 
     * @param {[EntityPositionObject]} itemPositions 
     * @param {{top: 0, bottom: 0, left: 0, right: 0}} requestedPostion 
     */
    static checkIfPositionOccupied = (playerPosition, enemyPostions, itemPositions,requestedPostion) => {
        console.log("Running: checkIfPositionOccupied")
        if(
            playerPosition.left === requestedPostion.left&&
            playerPosition.right === requestedPostion.right&&
            playerPosition.top === requestedPostion.top&&
            playerPosition.bottom === requestedPostion.bottom
        ) return true;

        let postionOccupied = false;

        enemyPostions.forEach(positionObj => {
            if(
                positionObj.enemyPostion.left === requestedPostion.left&&
                positionObj.enemyPostion.right === requestedPostion.right&&
                positionObj.enemyPostion.top === requestedPostion.top&&
                positionObj.enemyPostion.bottom === requestedPostion.bottom
            ) postionOccupied = true;
        })
        if(postionOccupied) return true;

        itemPositions.forEach(positionObj => {
            if(
                positionObj.enemyPostion.left === requestedPostion.left&&
                positionObj.enemyPostion.right === requestedPostion.right&&
                positionObj.enemyPostion.top === requestedPostion.top&&
                positionObj.enemyPostion.bottom === requestedPostion.bottom
            ) postionOccupied = true;
        })
        
        return postionOccupied;
        
    }

    /**
     * Generates a position for an entity within the game area
     * @param {{top: 0, bottom: 0, left: 0, right: 0}} playerPosition 
     * @param {[EntityPositionObject]} enemyPostions 
     * @param {[EntityPositionObject]} itemPositions 
     * @param {{top: 0, bottom: 0, left: 0, right: 0}} gameAreaPosition 
     */
    static getEmptyLocation = (playerPosition, enemyPostions, itemPositions,gameAreaPosition) => {
        console.log("Running: getEmptyLocation")
        let positionFound = false;
        let newPosition = null;

        while(!positionFound){
            let position = this.generateRandomPosition(gameAreaPosition);
            console.log("Generated position: ",position)
            let occupied = this.checkIfPositionOccupied(playerPosition,enemyPostions,itemPositions,position);
            console.log("Position occupied: ",occupied)
            if(!occupied) {
                newPosition = position;
                positionFound = true;
            }
        }

        return newPosition;

    }

    static randomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

/**
 * Checks if the player is overlapping or is being over lappped 
 * by an enemy entity. if true returns the index of the enemy in the array
 * @param {*} playerRef 
 * @param {*} enemyClass 
 */
    static playerEnemyOverLapCheckByRef = (playerRef, enemyClass="enemy") => {

        let playerPosition = playerRef.current.getBoundingClientRect();

        let enemies = document.getElementsByClassName(enemyClass);
        let enemyObjs = [];

        for(let i = 0; i<enemies.length; i++){
            let position = enemies[i].getBoundingClientRect();
            enemyObjs.push(position);
        }

        console.log(playerPosition,enemyObjs)

        let left = false;
        let right = false;
        let top = false;
        let bottom = false;

       for(let i = 0; i <enemyObjs.length; i++){
            left = this.positionRangeChecker(playerPosition.left, enemyObjs[i],'horizantal');
            right = this.positionRangeChecker(playerPosition.right, enemyObjs[i],'horizantal');
            top = this.positionRangeChecker(playerPosition.top, enemyObjs[i],'vertical');
            bottom = this.positionRangeChecker(playerPosition.bottom, enemyObjs[i],'vertical');
            console.log(left,right,top,bottom)
            if((left||right) && (top||bottom)) return i;
       }

        return null;
    }

    /**
     * checks if a a specific enemy is overlapping with the player
     * returns boolean
     * @param {*} playerRef 
     * @param {*} enemyRef 
     * @returns {boolean}
     */
    static enemyCheckPlayerOverLap = (playerRef, enemyRef) => {
        let playerPosition = playerRef.current.getBoundingClientRect();
        let enemyPosition = enemyRef.current.getBoundingClientRect();

        let left = false;
        let right = false;
        let top = false;
        let bottom = false;

        left = this.positionRangeChecker(playerPosition.left, enemyPosition,'horizantal');
        right = this.positionRangeChecker(playerPosition.right, enemyPosition,'horizantal');
        top = this.positionRangeChecker(playerPosition.top, enemyPosition,'vertical');
        bottom = this.positionRangeChecker(playerPosition.bottom, enemyPosition,'vertical');

        if((left||right) && (top||bottom)) return true;
        return false;
    }

    /**
     * checks if a value is in the range of an
     * entities position
     * @param {Number} value 
     * @param {top: 0, bottom: 0, left: 0, right: 0} position 
     */
    static positionRangeChecker = (value, position, orientation) => {
        if(orientation==='vertical'&&(value>=position.top&&value<=position.bottom)) return true;

        if(orientation==='horizantal'&&(value>=position.left&&value<=position.right))return true;
            
        return false;
    }
      

}

export default PositionHelper;