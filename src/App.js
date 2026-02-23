import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header.js';
import Home from './components/Home.js';
import AdminEntry from './components/AdminEntry.js';
import Map from './components/MapSection.js';
import Login from './components/FormAuth.js'; // Nhớ tạo file Login.js theo style antoanmualu

function App() {
  // Quản lý trạng thái đăng nhập để hiển thị UI/UX tương ứng
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('viewer'); // 'truong_ap' hoặc 'doan_thanh_nien'

  return (
    <Router>
      <div className="App">
        {/* Truyền state vào Header để đổi nút Đăng nhập thành Quản trị */}
        <Header isLoggedIn={isLoggedIn} userRole={userRole} />
        
        <Routes>
          {/* 1. TRANG CHỦ: Dành cho mọi người, chỉ thấy Bản đồ (Viewer) */}
          <Route path="/" element={
            <main>
              <Home />
              <Map userRole="viewer" />
              {/* Lưu ý: AdminEntry (Form & Nhật ký) bị ẩn ở trang chủ theo ý bạn */}
            </main>
          } />

          {/* 2. TRANG LOGIN: Giao diện sạch sẽ tone trắng xanh */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />

          {/* 3. TRANG QUẢN TRỊ: Chỉ Admin thấy đầy đủ công cụ */}
          <Route path="/admin" element={
            <main>
              <AdminEntry />
              <Map userRole="admin" />
            </main>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;