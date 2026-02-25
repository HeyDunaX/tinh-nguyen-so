// File: src/App.js
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
  
  // State quản lý tọa độ Marker được chọn trên bản đồ (Dùng chung cho AdminEntry và MapSection)
  const [selectedPos, setSelectedPos] = useState(null);

  return (
    <>
      {/* Ẩn Header khi ở trang Login để tối ưu diện tích */}
      {!isLoginPage && (
        <Header 
          isLoggedIn={isLoggedIn} 
          userRole={userRole} 
          userScope={userScope} 
        />
      )}

      <Routes>
        {/* Trang chủ: Chế độ viewer, xem toàn bộ bản đồ */}
        <Route path="/" element={
          <main>
            <Home />
            <MapSection userRole="viewer" userScope={userScope} />
          </main>
        } />

        {/* Trang đăng nhập */}
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/" /> : (
            <FormAuth 
              setIsLoggedIn={setIsLoggedIn} 
              setUserRole={setUserRole} 
              setUserScope={setUserScope} 
            />
          )
        } />

        {/* Trang Quản trị: Chỉ dành cho Admin/Trưởng ấp */}
        <Route path="/admin" element={
          isLoggedIn ? (
            <main>
              {/* Form nhập liệu: Nhận tọa độ từ selectedPos */}
              <AdminEntry 
                userScope={userScope} 
                selectedPos={selectedPos} 
              />
              {/* Bản đồ Admin: Khi kéo Marker sẽ cập nhật selectedPos */}
              <MapSection 
                userRole="admin" 
                userScope={userScope} 
                onPosChange={setSelectedPos} 
              />
            </main>
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </>
  );
};

export default function App() {
  // Các State quản lý trạng thái đăng nhập và phân quyền
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('viewer');
  const [userScope, setUserScope] = useState('');

  return (
    <Router>
      <AppContent 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        userRole={userRole} 
        setUserRole={setUserRole}
        userScope={userScope} 
        setUserScope={setUserScope}
      />
    </Router>
  );
}