import mask from '../../images/mask.jpg';


let Infoboard = ({playerScore, infectedCount, maskCount}) => {
    return (
        <div id="infoboard"
            style={{
                padding: 10
            }}
        >
            <div id="info-container"
                style={{
                    height: '100%',
                    width: '100%',
                    // backgroundColor: 'blue'
                }}
            >
                <GameTitle/>
                <Instructions/>
                <EntityInfo
                    playerScore={playerScore}
                    infectedCount={infectedCount}
                    maskCount={maskCount}
                />
                <Controls/>
            </div>
        </div>
    )
}

let GameTitle = () => {
    return (
        <div id="title-container"
            style={{
                width: '100%',
                height: 40,
                textAlign: 'center',
                margin: 10,
                // padding: 5
                // height: 
            }}
        >
            <p 
                style={{
                    fontFamily: 'sans-serif',
                    fontSize: 36,
                    color: '#000',
                    margin: 0,
                    padding: 0,
                    fontWeight: 'bolder'
                }}
            >
                Covida
            </p>
        </div>
    )
}

let Instructions = () => {
    return (
        <div>
            <h3>Instructions</h3>
            <ul>
                <li>Click the player character to enable movement</li>
                <li>Navigate around the red infected enemies without being touched</li>
                <li>Collect health items to build up points</li>
                <li>If touched your points will be reduced</li>
                <li>Lose if points fall below 0</li>
            </ul>
        </div>
    )
}

let Controls = () => {
    return (
        <div>
            <h3>Controls</h3>
            <ul>
                <li>Up arrow to move up</li>
                <li>Down arrow to move down</li>
                <li>Left arrow to move left</li>
                <li>Right arrow to move right</li>
            </ul>
        </div>
    )
}

let EntityInfo = ({playerScore, infectedCount, maskCount}) => {
    return (
        <div>
            <h3>Entity Information</h3>
            <EntityInfoRow
                color="#ffff00"
                styleObj={{borderRadius: '50px'}}
                points={playerScore}
                entityName={"Player Score"}
            />
            <EntityInfoRow
                color="#FF0000"
                points={infectedCount}
                entityName={"Infected Count"}
            />

            {/* <EntityInfoRowWithImages
                points={maskCount}
                entityName={"Masks"}
                image={
                    <img src={mask} alt="mask"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50px',
                    }}/>
                }
            /> */}
        </div>
    )
}

let EntityInfoRow = ({height=50, width=50, color, entityName, points, styleObj={}}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: "row",
            marginBottom: 10
        }}>
            <div style={{
                display: 'flex',
                flexDirection: "row",
                marginRight: 100
            }}>
                <div className="entity-info"
                    style={{
                        height: height,
                        width: width,
                        backgroundColor: color,
                        marginRight: 50,
                        ...styleObj,
                    }}
                />
                <p
                    style={{
                        fontWeight: 'bold'
                    }}
                >{entityName}</p>
            </div>
            <p>{points}</p>
        </div>
    )
}

let EntityInfoRowWithImages = ({height=50, width=50, image, entityName, points, styleObj={}}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: "row",
            marginBottom: 10
        }}>
            <div style={{
                display: 'flex',
                flexDirection: "row",
                marginRight: 100
            }}>
                <div className="entity-info"
                    style={{
                        height: height,
                        width: width,
                        marginRight: 50,
                        ...styleObj,
                    }}
                >
                    {image}
                </div>
                <p
                    style={{
                        fontWeight: 'bold'
                    }}
                >{entityName}</p>
            </div>
            <p>{points}</p>
        </div>
    )
}

export default Infoboard