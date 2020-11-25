import PlayerClass from '../../entity/playerClass';

let Player = ({height=50, width=50, color="#ffff00", gameAreaPosition, playerObj = new PlayerClass(), setPlayerObj, playerObjRef, position, setPostion}) => {

    return (
        <div id="player"
            tabIndex="0"
            ref={playerObjRef}
            onKeyDown={(event)=>{
                playerObj.move(setPostion,event.code, position, gameAreaPosition,playerObjRef.current.getBoundingClientRect())
                setPlayerObj({...playerObj,position: position});
            }}

            style={{
                height: height,
                width: width,
                backgroundColor: color,
                borderRadius: '50px',
                position: 'absolute',
                top: playerObj.position.top,
                bottom: playerObj.position.bottom,
                left: playerObj.position.left,
                right: playerObj.position.right
            }}
        />
    )
}

export default Player;