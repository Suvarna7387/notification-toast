import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Component1 from './components/Component1';
import Component2 from './components/Component2';
import Component3 from './components/Component3';

function App() {
  const [selectedComponent, setSelectedComponent] = useState('Component1');

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="app">
      <Header onComponentClick={handleComponentClick} setSelectedComponent={setSelectedComponent} />
      {selectedComponent === 'Component1' && <Component1 />}
      {selectedComponent === 'Component2' && <Component2 />}
      {selectedComponent === 'Component3' && <Component3 />}
      <Footer />
    </div>
  );
}

export default App;
