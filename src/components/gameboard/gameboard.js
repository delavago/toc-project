import {useRef, useState, useEffect} from 'react';
import EnemyClass from '../../entity/enemyClass';
import EntityPositionObject from '../../entity/entityPositionObject';
import PlayerClass from '../../entity/playerClass';
import EnemyLogic from '../../gameLogic/enemyLogic';
import HealthItemLogic from '../../gameLogic/HealthItemLogic';
import PositionHelper from '../../util/positionHelper';
import Enemy from '../enemy/enemy';

import {Player} from '../index'
import Mask from '../protection/mask';

let Gameboard = ({playerScore, infectedCount, maskCount, setPlayerScore, setInfectedCount, setMaskCount, modalVisible, setModalVisible, winLost, setWinLost, reset, setReset}) => {
    
    //State variables
    let [gameAreaPosition,setGameAreaPosition] = useState({top: 0, bottom: 0, left: 0, right: 0});
    let [playerPosition, setPlayerPostion] = useState({top: 0, bottom: 0, left: 0, right: 0});
    let [playerObj, setPlayerObj] = useState(new PlayerClass(playerPosition));

    let [enemyPositions, setEnemyPositions] = useState([])
    let [enemyObjs, setEnemyObjs] = useState([]);
    let [enemyRefs,setEnemyRefs] = useState([...Array(6).keys()].map(i=>{return {id: null, ref: null}}));

    let [healthItems, setHealthItems] = useState([]);

    let [mask, setMaskObj] = useState({id: 0,position: {top: 0, bottom: 0, left: 0, right: 0}})

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
        let masks = HealthItemLogic.generateHealthItems(gameAreaRef.current.getBoundingClientRect(),playerObjRef.current.getBoundingClientRect(),healthItems)
        setHealthItems(masks);

        setInfectedCount(enemies.length)
        setMaskCount(masks.length)
    },[])

    useEffect(()=>{
        if(healthItems.length<4){
            let masks = HealthItemLogic.generateHealthItems(gameAreaRef.current.getBoundingClientRect(),playerObjRef.current.getBoundingClientRect(),healthItems)
            setHealthItems(masks);
        }
    },[healthItems])

    useEffect(()=> {
        if(playerScore<0||playerScore===10) playerResetWinLose();
    },[playerScore])

    useEffect(()=>{
        if(reset){
            enemyReset();
            setPlayerScore(0);
            restHealthItem();
            playerReset();
        }
    },[reset])


    let addToEnemyRefList = (id,index,ref) => {
        console.log("add ref called")
        let tempRefs = [...enemyRefs];
        tempRefs[index].id = id;
        tempRefs[index].ref = ref;
        setEnemyRefs(tempRefs);
    }

    let addToItemRefList = (index,ref) => {
        console.log("add ref called")
        let tempHealthItems = [...healthItems];
        tempHealthItems[index].ref = ref;
        setHealthItems(tempHealthItems);
    }

    let removeHealthItem = (id) => {
        let items = healthItems.filter(val=>val.id !== id);
        setHealthItems(items);
        setMaskCount(items.length)
    }

    let reducePlayerScore = () => {
        setPlayerScore(playerScore-1);
    }

    /**
     * reset the enemies
     */
    let enemyReset = () => {
        let enemies = EnemyLogic.generateEnemies(gameAreaRef.current.getBoundingClientRect(),playerObjRef.current.getBoundingClientRect(),[],enemyPositions);
        setEnemyObjs(enemies);
        setEnemyPositions((()=>{
            let positions = enemies.map((item,index)=> new EntityPositionObject(item.id,item.position))
            return positions;
        })());
        setInfectedCount(enemies.length)
    }

    /**
     * Resets the player 
     */
    let playerReset = () => {
        let position = {top: 0, bottom: 0, left: 0, right: 0};
        setPlayerPostion(position);
        setPlayerObj({...playerObj,position: position});
    }

    /**
     * Resets the health items23
     */
    let restHealthItem = () => {
        let masks = HealthItemLogic.generateHealthItems(gameAreaRef.current.getBoundingClientRect(),playerObjRef.current.getBoundingClientRect(),healthItems)
        setHealthItems(masks);
        setMaskCount(masks.length)
    }

    let removeEntitiesFromScreen = () => {
        setEnemyObjs([]);
        setEnemyPositions([]);
        let position = {top: 0, bottom: 0, left: 0, right: 0};
        setPlayerPostion(position);
        setPlayerObj({...playerObj,position: position});
        setHealthItems([]);
    }

    /**
     * Reset the player if the the lose
     */
    let playerResetWinLose = () => {
        setWinLost(playerScore<0 ? "Lost" : playerScore===10 ? "Win" : 0);
        setModalVisible(true)
        removeEntitiesFromScreen();
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
                                reducePlayerScore={reducePlayerScore}
                            />
                        )
                    })
                }

                {healthItems.map((item,index)=>(
                    <Mask
                        width={50}
                        height={50}
                        color="	#FF0000"
                        maskObj={item}
                        index={index}
                        addToItemRefList={addToItemRefList}
                        removeItemFn={removeHealthItem}
                        playerRef={playerObjRef}
                        setPlayerPoints={()=>{
                            setPlayerScore(playerScore+1)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}



export default Gameboard