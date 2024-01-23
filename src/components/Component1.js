// Component1.js
import React, { useState } from 'react';
import Toast from './Toast';

const Component1 = () => {
  const [toasts, setToasts] = useState([]);
  const [queue, setQueue] = useState([]);
  let counter = 1;

  const addToast = () => {
    const message = 'Testing';
    counter++;

    if (toasts.length < 3) {
      // If there is space in the toasts array, add the new toast to it
      setToasts((prevToasts) => [{ message }, ...prevToasts]);
    } else {
      // If there is no space, add the new toast to the queue
      setQueue((prevQueue) => [...prevQueue, { message }]);
    }
  };

  const removeToast = (index) => {
    // Remove the toast at the given index from the toasts array
    const newToasts = [...toasts];
    newToasts.splice(index, 1);
    setToasts(newToasts);

    // If there are queued toasts, move one to the toasts array
    if (queue.length > 0) {
      const [nextQueuedToast, ...remainingQueue] = queue;
      setToasts((prevToasts) => [...prevToasts, nextQueuedToast]);
      setQueue(remainingQueue);
    }
  };

  return (
    <div className="centered-container">
      <button className="button-style" onClick={addToast}>
        Show Toast Message
      </button>
      <div className="toast-container">
        {toasts.map((toast, index) => (
          <Toast key={index} message={toast.message} index={index} onClose={() => removeToast(index)} />
        ))}
      </div>
    </div>
  );
};

export default Component1;
