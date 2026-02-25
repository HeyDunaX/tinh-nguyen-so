import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import '../stylesheet/FormAuth.css';

const FormAuth = ({ setIsLoggedIn, setUserRole, setUserScope }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (data?.user) {
      // Lấy quyền và mã vùng từ bảng profiles
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
      setIsLoggedIn(true);
      setUserRole(profile.role);
      setUserScope(profile.managed_scope);
      navigate('/admin');
    } else {
      alert("Đăng nhập thất bại: " + error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <Button variant="link" onClick={() => navigate('/')} className="back-home mb-3 text-muted">
          <FaArrowLeft className="me-2" /> Về trang chủ
        </Button>
        <Card className="login-box shadow-lg border-0">
          <div className="login-header-blue text-white text-center p-4">
            <FaShieldAlt size={35} className="mb-2" />
            <h4 className="fw-bold mb-0">Hệ thống Quản lý</h4>
            <p className="small mb-0 opacity-75">Bản đồ số Tình nguyện toàn quốc</p>
          </div>
          <Card.Body className="p-4 p-md-5">
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-secondary">Email / Tên đăng nhập</Form.Label>
                <Form.Control type="text" className="custom-input" onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-secondary">Mật khẩu</Form.Label>
                <Form.Control type="password" className="custom-input" onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100 login-btn-blue py-2 fw-bold">ĐĂNG NHẬP</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default FormAuth;