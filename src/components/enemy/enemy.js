import { useEffect, useRef } from 'react';
import EnemyClass from '../../entity/enemyClass';
import EnemyLogic from '../../gameLogic/enemyLogic';

let Enemy = ({height=50, width=50, color="#ffff00", gameAreaPosition, enemyObj = new EnemyClass(), position, addToRefList, index, setEnemyObjs, enemyObjs, playerRef}) => {

    let ref = useRef(null)

    useEffect(()=>{
        addToRefList(ref)
        EnemyLogic.move(position,gameAreaPosition,ref,index,setEnemyObjs,enemyObjs, playerRef)
    },[])

    return (
        <div className="enemy"
            key={enemyObj.id.toString()}
            tabIndex="0"
            ref={ref}
            // onKeyDown={(event)=>{
            //     enemyObj.move(setPostion,event.code, position, gameAreaPosition,enemyObjRef.current.getBoundingClientRect())
            //     setenemyObj({...enemyObj,position: position});
            // }}

            style={{
                height: height,
                width: width,
                backgroundColor: color,
                // borderRadius: '50px',
                position: 'absolute',
                top: enemyObj.position.top,
                bottom: enemyObj.position.bottom,
                left: enemyObj.position.left,
                right: enemyObj.position.right
            }}
        />
    )
}

export default Enemy;