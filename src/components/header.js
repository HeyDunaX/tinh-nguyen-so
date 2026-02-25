import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate, useLocation } from 'react-router-dom';
import '../stylesheet/Header.css';

const Header = ({ isLoggedIn, userRole, userScope }) => {
  const [active, setActive] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" className="service-bg navbar shadow-sm py-3">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }} className="brand d-flex align-items-center fw-bold text-white">
          <img src="/logo512.png" alt="Logo" height="60" className="me-2" />
          <div className="d-flex flex-column">
            <span>TÌNH NGUYỆN SỐ</span>
            {isLoggedIn && <small className="opacity-75" style={{fontSize: '10px'}}>ĐƠN VỊ: {userScope}</small>}
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0 bg-white" />
        
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* KHÔI PHỤC NAV LINKS: Chỉ hiện khi ở trang chủ */}
            {location.pathname === '/' && [
              { to: 'home', label: 'Trang chủ' },
              { to: 'map-section', label: 'Bản đồ số' },
              { to: 'guide', label: 'Hướng dẫn' }
            ].map((item) => (
              <ScrollLink
                key={item.to} to={item.to} spy={true} smooth={true} offset={-70} duration={150}
                className={`nav-link px-3 fw-medium ${active === item.to ? 'active' : ''}`}
                onSetActive={() => setActive(item.to)}
                style={{ color: '#ffffff', cursor: 'pointer' }}
              >
                {item.label}
              </ScrollLink>
            ))}

            <div className="ms-lg-4 mt-3 mt-lg-0">
              {isAdminPage ? (
                <Button variant="outline-light" onClick={() => navigate('/')} className="px-4 rounded-pill fw-bold">
                  ← VỀ TRANG CHỦ
                </Button>
              ) : (
                <Button 
                  variant="warning" className="fw-bold px-4 rounded-pill"
                  onClick={() => isLoggedIn ? navigate('/admin') : navigate('/login')}
                >
                  {isLoggedIn ? (userRole === 'truong_ap' ? '⚙️ QUẢN TRỊ' : 'XEM BÁO CÁO') : 'ĐĂNG NHẬP'}
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