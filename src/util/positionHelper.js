
class PositionHelper {

    /**
     * Generates a random postion
     * @param {{top: 0, bottom: 0, left: 0, right: 0}} gameAreaPosition 
     */
    static generateRandomPosition = (gameAreaPosition) => {
        let position = {top: 0, bottom: 0, left: 0, right: 0};
        let top = Math.floor(Math.random() * gameAreaPosition.bottom) + gameAreaPosition.top;
        let left = Math.floor(Math.random() * gameAreaPosition.right) + gameAreaPosition.left;

        if(top>0&&left>0){
            position.top = top;
            position.left = left;
            position.bottom = top + 50;
            position.right = left + 50;
        }

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

}

export default PositionHelper;