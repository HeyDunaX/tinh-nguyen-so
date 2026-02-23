import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import '../stylesheet/Login.css';

const Login = () => {
  return (
    <div className="login-wrapper">
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <a href="/" className="text-decoration-none text-muted mb-3 back-home">
          <FaArrowLeft className="me-2" /> Về trang chủ
        </a>
        
        <Card className="login-box shadow-lg border-0">
          {/* Phần đầu xanh đặc trưng của antoanmualu */}
          <div className="login-header-blue text-white text-center p-4">
            <FaShieldAlt className="mb-2" size={32} />
            <h4 className="fw-bold mb-0">Đăng nhập</h4>
            <p className="small mb-0 opacity-75">Hệ thống quản lý Bản đồ số Ấp 40</p>
          </div>

          <Card.Body className="p-4 p-md-5">
            <Form>
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-secondary">Email hoặc Username</Form.Label>
                <Form.Control type="text" placeholder="admin@tinhnguyen.vn hoặc admin" className="custom-input" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-secondary">Mật khẩu</Form.Label>
                <Form.Control type="password" placeholder="Nhập mật khẩu" className="custom-input" />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" className="login-btn-blue py-2 fw-bold">
                  Đăng nhập
                </Button>
              </div>

              <div className="text-center mt-4">
                <p className="text-muted extra-small">
                  Liên hệ quản trị viên để được cấp tài khoản
                </p>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;