class PlayerMovement {
    playerPosition = {top: 0, bottom: 0, left: 0, right: 0};

    constructor(currentPosition){
        this.playerPosition = currentPosition;
    }

    move = (postionFn,keyCode, positionObj) => {
        if(keyCode==="ArrowUp") positionObj.top+=1;
        if(keyCode==="ArrowDown") positionObj.bottom+=1;
        if(keyCode==="ArrowLeft") positionObj.left+=1;
        if(keyCode==="ArrowRight") positionObj.right+=1;
        postionFn(positionObj)
    }

}

export default PlayerMovement;