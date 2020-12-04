import EnemyClass from "../entity/enemyClass";
import EntityPositionObject from "../entity/entityPositionObject";
import PositionHelper from "../util/positionHelper";

class EnemyLogic {

    /**
     * Generates a position for an entity within the game area
     * @param {{top: 0, bottom: 0, left: 0, right: 0}} playerPosition 
     * @param {[EntityPositionObject]} enemyPositions 
     * @param {[EntityPositionObject]} itemPositions 
     * @param {{top: 0, bottom: 0, left: 0, right: 0}} gameAreaPosition 
     */
    static generateEnemies = (gameAreaPosition,playerPosition,itemPositions,enemyPositions) => {
        /**
         * @type {[EnemyClass]}
         */
        let enemies = []

        while(enemyPositions.length<=6&&enemies.length!==6){
            let position = PositionHelper.getEmptyLocation(playerPosition,enemyPositions,itemPositions,gameAreaPosition);
            let enemy = new EnemyClass(position);
            enemy.id = new Date().getTime();
            enemies.push(enemy);
        } 

        return enemies;
    }

    static randomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * up = 1
     * down = 2
     * left = 3
     * right 4
     */
    static chooseDirection = () => {return this.randomInteger(1,4)}

    static closeToBoundary = (gameAreaBoundaries,enemyPosition) => {
        if(gameAreaBoundaries.top===enemyPosition.top||gameAreaBoundaries.top>=enemyPosition.top) return 'top';
        if(gameAreaBoundaries.bottom===enemyPosition.bottom||gameAreaBoundaries.bottom<=enemyPosition.bottom) return 'bottom';
        if(gameAreaBoundaries.left===enemyPosition.left||gameAreaBoundaries.left>=enemyPosition.left) return 'left';
        if(gameAreaBoundaries.right===enemyPosition.right||gameAreaBoundaries.right<=enemyPosition.right) return 'right';
        return null;
    }

    static move = (positionObj, gameAreaBoundaries, enemyRef,enemyIndex,setEnemyObjs,enemyObjs, playerRef,reducePlayerScore) => {
        let directions = ["up","down","left","right"];
        let direction = directions[Math.floor(Math.random() * directions.length)];
        let temp = {top: 0, bottom: 0, left: 0, right: 0};
        temp.top = positionObj.top;
        temp.bottom = positionObj.bottom;
        temp.right = positionObj.right;
        temp.left = positionObj.left;

        setInterval(()=> {
            if(enemyRef.current!==null){

            let overlappingPlayer = PositionHelper.enemyCheckPlayerOverLap(playerRef,enemyRef);
            if(overlappingPlayer) reducePlayerScore()

            let actualPosition = enemyRef.current.getBoundingClientRect();
            if(direction==="up"&&gameAreaBoundaries.top!==temp.top) {
                temp.top-=20;
                temp.bottom-=20;
            }
            if(direction==="down"&&gameAreaBoundaries.bottom!==temp.bottom&&gameAreaBoundaries.bottom>=actualPosition.bottom) {
                temp.bottom+=20;
                temp.top+=20;
            }
            if(direction==="left"&&gameAreaBoundaries.left!==temp.left) {
                temp.left-=20;
                temp.right-=20;
            }
            if(direction==="right"&&gameAreaBoundaries.right!==temp.right&&gameAreaBoundaries.right>=actualPosition.right) {
                temp.right+=20;
                temp.left+=20;
            }

            if(gameAreaBoundaries.right<=actualPosition.right){
                let difference = actualPosition.right - gameAreaBoundaries.right;
                temp.right-=difference;
                temp.left-=difference;
            }

            if(gameAreaBoundaries.bottom<=actualPosition.bottom){
                let difference = actualPosition.bottom - gameAreaBoundaries.bottom;
                temp.bottom-=difference;
                temp.top-=difference;
            }

            let boundaryClosesTo = this.closeToBoundary(gameAreaBoundaries,actualPosition);

            if(boundaryClosesTo!==null){
                if(boundaryClosesTo==='top') direction = "down";
                if(boundaryClosesTo==='bottom') direction = "up";
                if(boundaryClosesTo==='left') direction = "right";
                if(boundaryClosesTo==='right') direction = "left";
            }

            // let proximityDirectionChange = this.borderProximityCheck(actualPosition,direction,enemyObjs);
            // if(proximityDirectionChange!==null) direction = proximityDirectionChange

            let tempEnemyObjs = [...enemyObjs];
            tempEnemyObjs[enemyIndex].position = temp;

            setEnemyObjs(tempEnemyObjs);
            }
        },250)
    }

    static borderProximityCheck = (position,direction,enemies=[]) => {
        let newDirection = null;

        for(let i = 0; i <enemies.length; i++){
            // if(enemies[i].position.bottom===position.top){
            //     newDirection='down';
            //     break;
            // }
            // if(enemies[i].position.top===position.bottom){
            //     newDirection='up';
            //     break;
            // }
            // if(enemies[i].position.left===position.right){
            //     newDirection='left';
            //     break;
            // }
            // if(enemies[i].position.right===position.left){
            //     newDirection='right';
            //     break;
            // }

            if(
                (position.right>=enemies[i].position.left&&position.right<=enemies[i].position.right)&&
                (position.top<=enemies[i].position.bottom&&position.top>=enemies[i].position.top)
            ){
                if(direction==='up') newDirection = 'down';
                if(direction==='down') newDirection = 'up';
                if(direction==='left') newDirection = 'right';
                if(direction==='right') newDirection = 'left';
                break;
            }

            // if(
            //     (position.left>=enemies[i].position.left&&position.left<=enemies[i].position.right)&&
            //     (position.bottom<=enemies[i].position.bottom&&position.bottom>=enemies[i].position.top)
            // ){
            //     if(direction==='up') newDirection = 'down';
            //     if(direction==='down') newDirection = 'up';
            //     if(direction==='left') newDirection = 'right';
            //     if(direction==='right') newDirection = 'left';
            //     break;
            // }
        }
        return newDirection;
    }

}

export default EnemyLogic;