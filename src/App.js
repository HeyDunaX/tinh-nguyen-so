import React from 'react';
import './App.css';
import Header from './components/header.js';
import Home from './components/Home.js';
import Awards from './components/Awards.js';
import Map from './components/MapSection.js';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
        <Map />
        <Awards />
      </main>
    </div>
  );
}

export default App;

