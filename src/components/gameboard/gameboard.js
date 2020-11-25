import {useRef, useState, useEffect} from 'react';
import PlayerClass from '../../entity/playerClass';

import {Player} from '../index'

let Gameboard = () => {
    
    //State variables
    let [gameAreaPosition,setGameAreaPosition] = useState({top: 0, bottom: 0, left: 0, right: 0});
    let [playerPosition, setPlayerPostion] = useState({top: 0, bottom: 0, left: 0, right: 0});
    let [playerObj, setPlayerObj] = useState(new PlayerClass(playerPosition));

    //References
    let gameAreaRef = useRef(null);
    let playerObjRef = useRef(null);

    useEffect(()=>{
        gameAreaRefFn()
        setPlayerPostion(playerObjRef.current.getBoundingClientRect());
        setPlayerObj({...playerObj,position: playerPosition});
    },[])


    let gameAreaRefFn = () => {
        setGameAreaPosition(gameAreaRef.current.getBoundingClientRect());
    }

    return (
        <div id="gameboard"
            style={{
                backgroundColor: '#000',
                // padding: '50px',
                overflow: 'hidden'
            }}
        >
            <div id="game-area"
                ref={gameAreaRef}
                style={{
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                    overflow: 'hidden'
                }}
            >
                <Player 
                    width={50}
                    height={50}
                    color="#fff000"
                    gameAreaPosition={gameAreaPosition}
                    playerObjRef={playerObjRef}
                    playerObj={playerObj}
                    setPlayerObj={setPlayerObj}
                    setPostion={setPlayerPostion}
                    position={playerPosition}

                />
            </div>
        </div>
    )
}



export default Gameboard