import {useRef, useState, useEffect} from 'react';
import EnemyClass from '../../entity/enemyClass';
import EntityPositionObject from '../../entity/entityPositionObject';
import PlayerClass from '../../entity/playerClass';
import EnemyLogic from '../../gameLogic/enemyLogic';
import PositionHelper from '../../util/positionHelper';
import Enemy from '../enemy/enemy';

import {Player} from '../index'

let Gameboard = () => {
    
    //State variables
    let [gameAreaPosition,setGameAreaPosition] = useState({top: 0, bottom: 0, left: 0, right: 0});
    let [playerPosition, setPlayerPostion] = useState({top: 0, bottom: 0, left: 0, right: 0});
    let [playerObj, setPlayerObj] = useState(new PlayerClass(playerPosition));

    let [enemyPositions, setEnemyPositions] = useState([])
    let [enemyObjs, setEnemyObjs] = useState([]);
    let [enemyRefs,setEnemyRefs] = useState([...Array(6).keys()].map(i=>{return {id: null, ref: null}}));

    let [itemPositions, setItemPositions] = useState([])
    let [itemObjs, setItemObjs] = useState([]);

    //References
    let gameAreaRef = useRef(null);
    let playerObjRef = useRef(null);
    let enemyObjRef = useRef(null);

    useEffect(()=>{
        setGameAreaPosition(gameAreaRef.current.getBoundingClientRect());
        setPlayerPostion(playerObjRef.current.getBoundingClientRect());
        setPlayerObj({...playerObj,position: playerPosition});

        let enemies = EnemyLogic.generateEnemies(gameAreaRef.current.getBoundingClientRect(),playerObjRef.current.getBoundingClientRect(),[],enemyPositions);
        setEnemyObjs(enemies);
        setEnemyPositions((()=>{
            let positions = enemies.map((item,index)=> new EntityPositionObject(item.id,item.position))
            return positions;
        })());
    },[])


    let addToEnemyRefList = (id,index,ref) => {
        console.log("add ref called")
        let tempRefs = [...enemyRefs];
        tempRefs[index].id = id;
        tempRefs[index].ref = ref;
        setEnemyRefs(tempRefs);
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
                    enemyObjs={enemyObjs}
                />

                {
                    enemyObjs.map((item,index)=> {
                        return(
                            <Enemy
                                width={50}
                                height={50}
                                color="	#FF0000"
                                gameAreaPosition={gameAreaPosition}
                                reff={enemyRefs[index].ref}
                                enemyObj={item}
                                position={item.position}
                                addToRefList={(ref)=>addToEnemyRefList(item.id, index, ref)}
                                index={index}
                                setEnemyObjs={setEnemyObjs}
                                enemyObjs={enemyObjs}
                                playerRef={playerObjRef}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}



export default Gameboard