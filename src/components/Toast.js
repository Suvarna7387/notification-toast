import React, { useEffect, useState } from 'react';
import './Toast.css';

const Toast = ({ message, onClose,index,time   }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, time * 1000); 

    return () => clearTimeout(timer);
  }, [onClose, time]);

  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 7000); 
    clearTimeout(timer);
    onClose();
  };

  const handleMouseLeave = () => {
    onClose();
  };

  return (
    <div
      className={`toast ${visible ? 'visible' : 'hidden'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>{message}{index !== undefined && `:${index + 1}`}</span>
      <button onClick={onClose}>x</button>
    </div>
  );
};

export default Toast;
