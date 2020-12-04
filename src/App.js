import { useState } from 'react';
import './App.css';

import {Gameboard,Infoboard} from './components/index'
import Modal from './components/modal/modal';

function App() {

  let [playerScore,setPlayerScore] = useState(0);
  let [infectedCount,setInfectedCount] = useState(0);
  let [maskCount,setMaskCount] = useState(0);

  let [modalVisible, setModalVisible] = useState(false)
  let [winLost, setWinLost] = useState("");
  let [reset,setReset] = useState(false);



  return (
    <div className="App">
      {modalVisible ? <Modal
        winLost={winLost}
        reset={reset}
        setReset={setReset}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      /> : null}
      <Gameboard
        playerScore={playerScore}
        setPlayerScore={setPlayerScore}
        infectedCount={infectedCount}
        setInfectedCount={setInfectedCount}
        maskCount={maskCount}
        setMaskCount={setMaskCount}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        winLost={winLost}
        setWinLost={setWinLost}
        reset={reset}
        setReset={setReset}
      />
      <Infoboard
        playerScore={playerScore}
        infectedCount={infectedCount}
        maskCount={maskCount}
      />
    </div>
  );
}

export default App;
