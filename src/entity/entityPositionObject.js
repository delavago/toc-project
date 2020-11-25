class EntityPositionObject {
    enemyId = null;
    enemyPostion = {top: 0, bottom: 0, left: 0, right: 0};
    
    constructor(id, position){
        this.enemyId = id;
        this.enemyPostion = position;
    }
}

export default EntityPositionObject;