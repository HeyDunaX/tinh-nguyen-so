import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import Home from './components/Home';
import AdminEntry from './components/AdminEntry';
import Map from './components/MapSection';
import Login from './components/FormAuth'; // Đổi tên cho khớp file của bạn
import './App.css';

// Component con để xử lý việc ẩn/hiện Header
const AppContent = ({ isLoggedIn, setIsLoggedIn, userRole, setUserRole }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {/* ẨN HEADER KHI Ở TRANG LOGIN */}
      {!isLoginPage && <Header isLoggedIn={isLoggedIn} userRole={userRole} />}
      
      <Routes>
        <Route path="/" element={
          <main>
            <Home />
            {/* VIEW PUBLIC: CHỈ THẤY BẢN ĐỒ TOÀN QUỐC */}
            <Map userRole="viewer" />
          </main>
        } />

        <Route path="/login" element={
          <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
        } />

        <Route path="/admin" element={
          isLoggedIn ? (
            <main>
              <AdminEntry />
              <Map userRole="admin" />
            </main>
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
          )
        } />
      </Routes>
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('viewer');

  return (
    <Router>
      <div className="App">
        <AppContent 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
          userRole={userRole} 
          setUserRole={setUserRole} 
        />
      </div>
    </Router>
  );
}

export default App;