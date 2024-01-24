import React from 'react';
import './Header.css';

const Header = ({ setSelectedComponent, selectedComponent }) => {
  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className='header-container'>
      <div className='Left-Header'>Header</div>
      <div className='right_header'>
        <div
          className={`header-option ${selectedComponent === 'Component1' ? 'active' : ''}`}
          onClick={() => handleComponentClick('Component1')}
        >
          First Component
        </div>
        <div
          className={`header-option ${selectedComponent === 'Component2' ? 'active' : ''}`}
          onClick={() => handleComponentClick('Component2')}
        >
          Second Component
        </div>
        <div
          className={`header-option ${selectedComponent === 'Component3' ? 'active' : ''}`}
          onClick={() => handleComponentClick('Component3')}
        >
          Third Component
        </div>
      </div>
    </div>
  );
};

export default Header;
