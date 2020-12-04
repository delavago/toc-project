import HealthItemClass from '../entity/heathItemClass'
import PositionHelper from "../util/positionHelper";

class HealthItemLogic {
    
    /**
     * Generates a position for an entity within the game area
     * @param {{top: 0, bottom: 0, left: 0, right: 0}} playerPosition 
     * @param {[EntityPositionObject]} itemPositions 
     * @param {{top: 0, bottom: 0, left: 0, right: 0}} gameAreaPosition 
     */
    static generateHealthItems = (gameAreaPosition, playerPosition,itemPositions) => {
        
        /**
         * @type{[HealthItemClass]}
         */
        let items = [];

        while(itemPositions.length<=4&&items.length!==4){
            let position = PositionHelper.getEmptyLocation(playerPosition,[],itemPositions,gameAreaPosition);
            let item = new HealthItemClass(position,null);
            item.id = new Date().getTime();
            items.push(item);
        }

        return items;
    }

    static checkIfPlayerTouchedItem = (playerRef, itemRef, setPlayerPointsFn,itemObj,removeItem) => {
        setInterval(()=>{
            if(itemRef.current!==null){
                let overlappingPlayer = PositionHelper.enemyCheckPlayerOverLap(playerRef,itemRef);
                if(overlappingPlayer) {
                    setPlayerPointsFn();
                    removeItem(itemObj.id);
                }
            }
        },250)
    }

}

export default HealthItemLogic;