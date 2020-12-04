import { useEffect, useRef } from 'react';
import HealthItemLogic from '../../gameLogic/HealthItemLogic';

import mask from '../../images/mask.jpg'

let Mask = ({height=50, width=50, color="#ffff00", index, maskObj, addToItemRefList, removeItemFn, playerRef, setPlayerPoints}) => {

    let ref = useRef(null)

    useEffect(()=>{
        addToItemRefList(index,ref)
        HealthItemLogic.checkIfPlayerTouchedItem(playerRef, ref, setPlayerPoints, maskObj, removeItemFn)
    },[])

    return (
        <div className="protection mask"
            key={maskObj.id.toString()}
            tabIndex="0"
            ref={ref}

            style={{
                height: height,
                width: width,
                backgroundColor: color,
                borderRadius: '50px',
                position: 'absolute',
                top: maskObj.position.top,
                bottom: maskObj.position.bottom,
                left: maskObj.position.left,
                right: maskObj.position.right,
            }}
        >
            <img src={mask} alt="mask"
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50px',
                }}
            />
        </div>
    )
}

export default Mask;