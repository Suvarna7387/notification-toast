// Component2.js
import React, { useState } from 'react';
import Toast from './Toast';

const Component2 = () => {
  const [inputValue, setInputValue] = useState('');
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const newToasts = [...toasts, message];
    setToasts(newToasts.slice(-3)); // Keep only the latest 3 toasts
  };

  const removeToast = (index) => {
    const newToasts = [...toasts];
    newToasts.splice(index, 1);
    setToasts(newToasts);
  };

  const handleClick = () => {
    if (inputValue.trim() === '') {
      alert('Please enter custom text.');
      return; // Don't proceed further if the input is empty
    }

    addToast(inputValue);
    setInputValue(''); // Clear the input after adding the toast
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
      <button className="button-style" onClick={handleClick}>
        Show Toast Message
      </button>
      <div className="toast-container">
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            message={toast}
            onClose={() => removeToast(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Component2;
