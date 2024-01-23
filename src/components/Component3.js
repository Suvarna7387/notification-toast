// Component3.js
import React, { useState, useEffect } from 'react';
import Toast from './Toast';

const Component3 = () => {
  const [inputValue, setInputValue] = useState('');
  const [toasts, setToasts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [apiError, setApiError] = useState(false);
  const [apiResponseReceived, setApiResponseReceived] = useState(false);

  const addToast = (message) => {
    const newToasts = [...toasts, { message }];
    setToasts(newToasts.slice(-3));
  };

  const removeToast = (index) => {
    const newToasts = [...toasts];
    newToasts.splice(index, 1);
    setToasts(newToasts);
  };

  const handleCountdown = async (seconds) => {
    let count = seconds;

    const countdownInterval = setInterval(() => {
      count--;

      if (count === 0) {
        clearInterval(countdownInterval);
        makeApiCall();
      } else {
        addToast(`Countdown: ${count} seconds`);
      }
    }, 1000);
  };

  const makeApiCall = async () => {
    try {
      const response = await fetch('https://api.knowmee.co/api/v1/master/get-country-list');
      const data = await response.json();

      console.log('API Response:', data.responseData);

      const countryNames = data.responseData.map(country => country.country_name);
      setCountries(countryNames);
      setApiError(false);
      setApiResponseReceived(true);
      // Hide the Toast Message when API response is received
      setToasts([]);
    } catch (error) {
      console.error('Error making API call:', error);
      addToast('Error making API call. See console for details.');
      setApiError(true);
    }
  };

  const handleClick = () => {
    const seconds = parseInt(inputValue, 10);

    if (isNaN(seconds) || seconds <= 0) {
      alert('Please enter a valid number of seconds.');
      return;
    }

    addToast(`Countdown: ${seconds} seconds`);
    handleCountdown(seconds);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCountries = countries.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="centered-container">
      {!apiResponseReceived && (
        <div>
          <div>Enter Countdown Time</div>
          <input
            className="input-style"
            placeholder='Enter here'
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div><button className="button-style" onClick={handleClick}>Start Timer</button></div>
        </div>
      )}
      <div className="toast-container">
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            message={toast.message}
            onClose={() => removeToast(index)}
          />
        ))}
      </div>
      {(apiError || currentCountries.length === 0) ? (
        <div>
          <p>
            {apiError
              ? 'Failed to fetch data from API. Please try again later.'
              : null}
          </p>
        </div>
      ) : (
        <div>
          <h2>Country Names:</h2>
          <div className="country-names-container">
            {currentCountries.map((country, index) => (
              <div className='each-Country_name' key={index}>{country}</div>
            ))}
          </div>
          <div>
            <button className='button-style-pagination' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span className='page-number'> Page {currentPage} </span>
            <button className='button-style-pagination' onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastItem >= countries.length}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Component3;
