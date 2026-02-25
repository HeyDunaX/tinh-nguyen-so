import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import Home from './components/Home';
import AdminEntry from './components/AdminEntry';
import Map from './components/MapSection';
import FormAuth from './components/FormAuth';
import './App.css';

const AppContent = ({ isLoggedIn, setIsLoggedIn, userRole, setUserRole, userScope, setUserScope }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {/* Ẩn Navbar hoàn toàn khi ở trang Login theo yêu cầu của Nhân */}
      {!isLoginPage && <Header isLoggedIn={isLoggedIn} userRole={userRole} />}
      <Routes>
        <Route path="/" element={<main><Home /><Map userRole="viewer" /></main>} />
        <Route path="/login" element={
          <FormAuth 
            setIsLoggedIn={setIsLoggedIn} 
            setUserRole={setUserRole} 
            setUserScope={setUserScope} 
          />
        } />
        <Route path="/admin" element={
          isLoggedIn ? (
            <main>
              <AdminEntry userScope={userScope} />
              <Map userRole="admin" userScope={userScope} />
            </main>
          ) : <FormAuth setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} setUserScope={setUserScope} />
        } />
      </Routes>
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('viewer');
  const [userScope, setUserScope] = useState(''); // Lưu scope toàn quốc

  return (
    <Router>
      <AppContent 
        isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} 
        userRole={userRole} setUserRole={setUserRole}
        userScope={userScope} setUserScope={setUserScope}
      />
    </Router>
  );
}

export default App;