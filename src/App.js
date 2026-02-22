import React from 'react';
import './App.css';
import Header from './components/header.js';
import Home from './components/Home.js';
import AdminEntry from './components/AdminEntry.js';
import Map from './components/MapSection.js';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
        <Map />
        <AdminEntry />
      </main>
    </div>
  );
}

export default App;

