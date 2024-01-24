import React, { useEffect, useState } from 'react';
import './Toast.css';

const Toast = ({ message, onClose,index }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 7000);

    return () => clearTimeout(timer);
  }, [onClose]);

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
