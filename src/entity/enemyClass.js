import { useRef } from "react";
import { Entity } from "./entity";

class EnemyClass extends Entity {

    id = null;
    ref = null;

    constructor(positionObj={}){
        super();
        this.position = positionObj
    }

}

export default EnemyClass;