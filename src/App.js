import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/header';
import Home from './components/Home';
import AdminEntry from './components/AdminEntry';
import MapSection from './components/MapSection';
import FormAuth from './components/FormAuth';

const AppContent = ({ isLoggedIn, setIsLoggedIn, userRole, setUserRole, userScope, setUserScope }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  
  // Tọa độ mặc định (Ví dụ: Trung tâm xã Xuân Thới Sơn)
  const defaultCenter = { lat: 10.893, lng: 106.588 };
  
  // State quản lý tọa độ Marker - Khởi tạo bằng giá trị mặc định
  const [selectedPos, setSelectedPos] = useState(defaultCenter);

  return (
    <>
      {!isLoginPage && <Header isLoggedIn={isLoggedIn} userRole={userRole} userScope={userScope} />}
      
      <Routes>
        {/* TRANG CHỦ: Mọi người đều vào được */}
        <Route path="/" element={
          <main>
            <Home />
            <MapSection userRole="viewer" userScope={userScope} />
          </main>
        } />

        {/* TRANG ĐĂNG NHẬP */}
        <Route path="/login" element={
          <FormAuth 
            setIsLoggedIn={setIsLoggedIn} 
            setUserRole={setUserRole} 
            setUserScope={setUserScope} 
          />
        } />

        {/* TRANG ADMIN: Chỉ hiện Form nếu đã đăng nhập, Map vẫn hiện để định vị */}
        <Route path="/admin" element={
          isLoggedIn ? (
            <main>
              <AdminEntry userScope={userScope} selectedPos={selectedPos} />
              <MapSection 
                userRole="admin" 
                userScope={userScope} 
                selectedPos={selectedPos} // Truyền tọa độ hiện tại vào
                onPosChange={setSelectedPos} // Cập nhật tọa độ khi kéo
              />
            </main>
          ) : <Navigate to="/login" />
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