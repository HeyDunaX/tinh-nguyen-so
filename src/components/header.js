import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import '../stylesheet/Header.css';

const Header = ({ isLoggedIn, userRole, userScope }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <Navbar expand="lg" sticky="top" className="service-bg shadow-sm py-2">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} className="d-flex align-items-center fw-bold text-white" style={{ cursor: 'pointer' }}>
          {/* Logo 512px từ public folder */}
          <img src="/logo512.png" alt="Logo" height="45" className="me-2 rounded shadow-sm" />
          <div className="d-flex flex-column">
            <span style={{ fontSize: '1.1rem' }}>TÌNH NGUYỆN SỐ</span>
            {isLoggedIn && <small className="opacity-75" style={{ fontSize: '0.7rem' }}>ĐƠN VỊ: {userScope}</small>}
          </div>
        </Navbar.Brand>

        <Navbar.Toggle className="border-0 bg-white" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {isAdminPage ? (
              <Button variant="outline-light" onClick={() => navigate('/')} className="px-4 rounded-pill fw-bold">
                ← VỀ TRANG CHỦ
              </Button>
            ) : (
              <Button variant="warning" onClick={() => isLoggedIn ? navigate('/admin') : navigate('/login')} className="fw-bold px-4 rounded-pill">
                {isLoggedIn ? '⚙️ QUẢN TRỊ' : 'ĐĂNG NHẬP'}
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;