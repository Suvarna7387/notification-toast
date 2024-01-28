import React, { useState } from 'react';
import Toast from './Toast';
import settingImage from "./Images/icons8-settings-50.png"


const Component2 = () => {
  const [inputValue, setInputValue] = useState('');
  const [toasts, setToasts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [time, setTime] = useState(7);
  const [newTime, setNewTime] = useState('');

  const addToast = (message) => {
    const newToasts = [...toasts, message];
    setToasts(newToasts.slice(-3)); 
  };

  const removeToast = (index) => {
    const newToasts = [...toasts];
    newToasts.splice(index, 1);
    setToasts(newToasts);
  };

  const handleClick = () => {
    if (inputValue.trim() === '') {
      alert('Please enter custom text.');
      return; 
    }

    addToast(inputValue);
    setInputValue(''); 
  };

  const handleChangeTime = (event) => {
    setNewTime(event.target.value); 
  };

  const handleConfirm = () => {
    if (newTime.trim() === '') {
      alert('Please enter a timeout value');
      return;
    }
    setTime(parseInt(newTime));
    setShowPopup(false); 
  };

  const handleClosePopup = () => {
    setShowPopup(false); 
    setNewTime(''); 
  };

  return (
    <div className="centered-container">
      <div>Enter Custom Toast Text</div>
      <input
        className="input-style"
        placeholder='Enter here'
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
     <div style={{display:"flex"}}> <button className="button-style" onClick={handleClick}>
        Show Toast Message
      </button>
      <div>
          <img onClick={() => setShowPopup(true)} className="settingImage" src={settingImage} />
        </div></div>
      {showPopup && (
        <div className='popup-overlay'>
          <div className="popup">
            <label>Set Timeout:</label>
            <input className='Input_change_time' type="number" value={newTime} onChange={handleChangeTime}  />
            <div>
              <button onClick={handleConfirm}>Confirm</button>
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        </div>
      )}
      <div className="toast-container">
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            message={toast}
            onClose={() => removeToast(index)}
            time={time}
          />
        ))}
      </div>
    </div>
  );
};

export default Component2;