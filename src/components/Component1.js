import React, { useState } from 'react';
import Toast from './Toast';
import settingImage from "./Images/icons8-settings-50.png"

const Component1 = () => {
  const [toasts, setToasts] = useState([]);
  const [queue, setQueue] = useState([]);
  const [time, setTime] = useState(7); 
  const [showPopup, setShowPopup] = useState(false);
  const [newTime, setNewTime] = useState(''); 
  let counter = 1;

  const addToast = () => {
    const message = 'Testing';
    counter++;

    if (toasts.length < 3) {
      setToasts((prevToasts) => [{ message }, ...prevToasts]);
    } else {
      setQueue((prevQueue) => [...prevQueue, { message }]);
    }
  };

  const removeToast = (index) => {
    const newToasts = [...toasts];
    newToasts.splice(index, 1);
    setToasts(newToasts);

    if (queue.length > 0) {
      const [nextQueuedToast, ...remainingQueue] = queue;
      setToasts((prevToasts) => [...prevToasts, nextQueuedToast]);
      setQueue(remainingQueue);
    }
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
      <div style={{ display: "flex" }}>
        <button className="button-style" onClick={addToast}>
          Show Toast Message
        </button>
        <div>
          <img onClick={() => setShowPopup(true)} className="settingImage" src={settingImage} />
        </div>
      </div>
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
          <Toast key={index} message={toast.message} index={index} onClose={() => removeToast(index)} time={time} />
        ))}
      </div>
    </div>
  );
};

export default Component1;