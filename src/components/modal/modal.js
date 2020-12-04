let Modal = ({winLost, setWinLost, reset, setReset,modalVisible, setModalVisible}) => {
    return (
        <div id="modal-background"
            style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                background: 'rgba(0,0,0,0.6)',
                zIndex: 1,
                display: 'grid',
                alignItems: 'center',
                justifyItems: 'center'
            }}
        >
            <div 
                id="modal"
                style={{
                    width: '400px',
                    height: ' 250px',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    display: 'grid',
                    justifyItems: "center",
                }}
            >
                <h2>Game Over</h2>
                <p>You {winLost}</p>
                <button
                    style={{
                        width: 100,
                        height: 40,
                        borderRadius: 10,
                        borderWidth: 0,
                        backgroundColor: 'green',
                        color: '#fff',
                        fontSize: 18
                    }}
                    onClick={()=>{
                        setReset(true);
                        setModalVisible(false);
                        setReset(false);
                    }}
                >Reset</button>
            </div>
        </div>
    )
}

export default Modal;