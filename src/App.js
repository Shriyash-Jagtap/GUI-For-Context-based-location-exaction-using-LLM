import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [panelText, setPanelText] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = async () => {
    if (inputText.trim() !== '') {
      // Send the message to Flask backend
      const response = await fetch('http://localhost:5000/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const receivedMessage = responseData.data_received;
        console.log(receivedMessage);
        // Update chat log with the received message
        setPanelText([...panelText, receivedMessage]);
        setInputText('');
      }
    }
  };

  return (
    <div className="App">
      <div className="background-right"></div>
      <div className="background-left"></div>
      <div className="background-net"></div>

      <div className="panel">
      <div className="chat-log">
          {panelText.map((text, index) => (
            <div key={index} className="chat-item">
              {text}
            </div>
          ))}
        </div>

        {/* Input box container */}
        <div className="input-box-container">
          <input
            type="text"
            className="input-box"
            placeholder="Type here..."
            value={inputText}
            onChange={handleInputChange}
          />
          {/* Square button inside the input box */}
          <button className="input-button" onClick={handleButtonClick}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;