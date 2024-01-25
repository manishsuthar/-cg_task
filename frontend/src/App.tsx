import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [winner, setWinner] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event:any) => {
    setInputValue(event.target.value);
  };

  const handlePlayGame = async () => {
    try {
      setLoading(true);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const requestOptions:any = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({playersInput:inputValue}),
        redirect: 'follow'
      };
      
      const response = await fetch("http://localhost:3001", requestOptions)
      const data = await response.json();
      setWinner(data.winner);
    } catch (error) {
      console.error('Error playing the game:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Dice Game</h1>
      <textarea
        rows={5}
        cols={30}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter dice rolls for each player separated by '|'"
      />
      <div>
        <button className='button' onClick={handlePlayGame} disabled={loading}>
          {loading ? 'Processing...' : 'Play Game'}
        </button>
        
      </div>
      <div>
       {winner && <div className="winner"> Result : {winner}</div>}
      </div>
      
    </div>
  );
}

export default App;
