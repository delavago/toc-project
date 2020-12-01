import { Entity } from "./entity";

class PlayerClass extends Entity {

    constructor(positionObj={}){
        super();
        this.position = positionObj
    }

    move = (postionFn,keyCode, positionObj, gameAreaBoundaries, actualPosition) => {
        if(keyCode==="ArrowUp"||keyCode==="ArrowLeft"||keyCode==="ArrowRight"||keyCode==="ArrowDown"){
            console.log("Movement log: ",positionObj);
            console.log("Game area boundaries: ",gameAreaBoundaries);
            console.log("Actual Position: ",actualPosition);
            let temp = {top: 0, bottom: 0, left: 0, right: 0};
            temp.top = positionObj.top;
            temp.bottom = positionObj.bottom;
            temp.right = positionObj.right;
            temp.left = positionObj.left;

            if(keyCode==="ArrowUp"&&gameAreaBoundaries.top!==temp.top) {
                temp.top-=20;
                temp.bottom-=20;
            }
            if(keyCode==="ArrowDown"&&gameAreaBoundaries.bottom!==temp.bottom&&gameAreaBoundaries.bottom>=actualPosition.bottom) {
                temp.bottom+=20;
                temp.top+=20;
            }
            if(keyCode==="ArrowLeft"&&gameAreaBoundaries.left!==temp.left) {
                temp.left-=20;
                temp.right-=20;
            }
            if(keyCode==="ArrowRight"&&gameAreaBoundaries.right!==temp.right&&gameAreaBoundaries.right>=actualPosition.right) {
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

            // if(gameAreaBoundaries.right<temp.right) temp.right = gameAreaBoundaries.right;
            postionFn(temp)
        }
    }
}

export default PlayerClass;