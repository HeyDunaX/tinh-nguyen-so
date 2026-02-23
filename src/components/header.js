import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate, useLocation } from 'react-router-dom'; // Thêm useNavigate
import '../stylesheet/Header.css';
import '../stylesheet/Color.css';

const Header = ({ isLoggedIn, userRole }) => {
  const [active, setActive] = useState('home');
  const navigate = useNavigate(); // Hook để nhảy trang
  const location = useLocation(); // Kiểm tra xem đang ở trang nào

  // Hàm xử lý khi bấm nút Đăng nhập hoặc Quản trị
  const handleAuthAction = () => {
    if (isLoggedIn) {
      navigate('/admin'); // Nếu đã login, nhảy vô trang quản trị
    } else {
      navigate('/login'); // Nếu chưa, nhảy qua trang đăng nhập
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" className="service-bg navbar shadow-sm py-3">
      <Container>
        <Navbar.Brand 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer' }}
          className="brand d-flex align-items-center fw-bold text-white"
        >
          <svg className="me-2" xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 -960 960 960" fill="#FFFFFF">
            <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q164 0 260.5 89T837-552q0 127-79.5 244.5T480-80Z"/>
          </svg>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0 bg-white" />
        
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* Chỉ hiện Link cuộn khi đang ở trang chủ */}
            {location.pathname === '/' && [
              { to: 'home', label: 'Trang chủ' },
              { to: 'map-section', label: 'Bản đồ số' },
              { to: 'guide', label: 'Hướng dẫn' }
            ].map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={150}
                className={`nav-link px-3 fw-medium ${active === item.to ? 'active' : ''}`}
                onSetActive={() => setActive(item.to)}
                style={{ color: '#ffffff', cursor: 'pointer' }}
              >
                {item.label}
              </ScrollLink>
            ))}

            <div className="ms-lg-4 mt-3 mt-lg-0">
              {isLoggedIn ? (
                <Button 
                  variant="warning" 
                  className="fw-bold px-4 rounded-pill"
                  onClick={handleAuthAction}
                >
                  {userRole === 'truong_ap' ? '⚙️ QUẢN TRỊ ẤP' : 'XEM BÁO CÁO'}
                </Button>
              ) : (
                <Button 
                  variant="outline-light" 
                  className="px-4 rounded-pill fw-bold"
                  onClick={handleAuthAction} // NHẢY QUA TRANG LOGIN
                >
                  ĐĂNG NHẬP
                </Button>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;