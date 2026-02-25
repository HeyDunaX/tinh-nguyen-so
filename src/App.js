import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import Home from './components/Home';
import AdminEntry from './components/AdminEntry';
import MapSection from './components/MapSection';
import FormAuth from './components/FormAuth';

const AppContent = ({ isLoggedIn, setIsLoggedIn, userRole, setUserRole, userScope, setUserScope }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [selectedPos, setSelectedPos] = useState(null); // Tọa độ từ bản đồ

  return (
    <>
      {!isLoginPage && <Header isLoggedIn={isLoggedIn} userRole={userRole} userScope={userScope} />}
      <Routes>
        <Route path="/" element={<main><Home /><MapSection userRole="viewer" /></main>} />
        <Route path="/login" element={
          <FormAuth setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} setUserScope={setUserScope} />
        } />
        <Route path="/admin" element={
          isLoggedIn ? (
            <main>
              <AdminEntry userScope={userScope} selectedPos={selectedPos} />
              <MapSection 
                userRole="admin" 
                userScope={userScope} 
                onLocationChange={setSelectedPos} // Nhận tọa độ khi kéo marker
              />
            </main>
          ) : <FormAuth setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} setUserScope={setUserScope} />
        } />
      </Routes>
    </>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('viewer');
  const [userScope, setUserScope] = useState('');

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