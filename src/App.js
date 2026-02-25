import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import Home from './components/Home';
import AdminEntry from './components/AdminEntry';
import Map from './components/MapSection';
import FormAuth from './components/FormAuth';
import './App.css';

const AppContent = ({ isLoggedIn, setIsLoggedIn, userRole, setUserRole, userScope }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Header isLoggedIn={isLoggedIn} userRole={userRole} />}
      <Routes>
        <Route path="/" element={<main><Home /><Map userRole="viewer" /></main>} />
        <Route path="/login" element={
          <FormAuth setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
        } />
        <Route path="/admin" element={
          isLoggedIn ? (
            <main>
              <AdminEntry userScope={userScope} />
              <Map userRole="admin" userScope={userScope} />
            </main>
          ) : <FormAuth setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
        } />
      </Routes>
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('viewer');
  const [userScope, setUserScope] = useState(''); // Lưu mã vùng: VN.HCM.HM.XTS.A40

  return (
    <Router>
      <AppContent 
        isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} 
        userRole={userRole} setUserRole={setUserRole}
        userScope={userScope}
      />
    </Router>
  );
}

export default App;