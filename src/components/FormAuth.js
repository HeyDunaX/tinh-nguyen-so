import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import '../stylesheet/FormAuth.css';

const Login = () => {
  return (
    <div className="login-page">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Card className="login-card shadow-sm border-0">
          <Card.Body className="p-4 p-md-5">
            <div className="text-center mb-4">
              <a href="/" className="back-to-home">
                <FaArrowLeft className="me-2" /> Về trang chủ
              </a>
              <div className="login-brand-wrapper">
                <FaShieldAlt className="brand-shield-icon" />
                <h3 className="login-title">Đăng nhập</h3>
                <p className="login-subtitle">Hệ thống quản lý Bản đồ số Ấp 40</p>
              </div>
            </div>

            <Form>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold text-muted">Tên đăng nhập / Email</Form.Label>
                <Form.Control type="text" placeholder="Ví dụ: truongap40" className="login-input-large" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold text-muted">Mật khẩu</Form.Label>
                <Form.Control type="password" placeholder="••••••••" className="login-input-large" />
              </Form.Group>

              <Button variant="primary" className="w-100 login-btn-main">
                BẮT ĐẦU LÀM VIỆC
              </Button>

              <p className="login-footer-text">
                Liên hệ Quản trị viên chi đoàn để được cấp tài khoản nếu bạn là Trưởng ấp hoặc Tổ trưởng.
              </p>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;