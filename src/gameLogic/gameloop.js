import EnemyClass from "../entity/enemyClass";
import EntityPositionObject from "../entity/entityPositionObject";
import PlayerClass from "../entity/playerClass";

class GameLoop {
    
    enemyMax = 6;
    enemyMin = 0;
    enemyCount = 0;

    /**
     * @type {[EntityPositionObject]}
     */
    enemyPositions = [];
    /**
     * @type {[EnemyClass]}
     */
    enemyObjects = [];

    playerPosition = {top: 0, bottom: 0, left: 0, right: 0};

    player = new PlayerClass();

}

export default GameLoop;