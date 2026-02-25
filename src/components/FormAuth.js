// File: FormAuth.js
import React, { useState } from 'react';
import { Container, Card, Form, Button, InputGroup } from 'react-bootstrap'; // Thêm InputGroup
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const FormAuth = ({ setIsLoggedIn, setUserRole, setUserScope }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State hiện mật khẩu
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    
    if (authError) {
      setError('Tài khoản hoặc mật khẩu không chính xác!');
      return;
    }
    
    const { data: p } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
    setIsLoggedIn(true); 
    setUserRole(p.role); 
    setUserScope(p.managed_scope);
    
    // 2. Chuyển về trang chủ sau khi đăng nhập thành công
    navigate('/'); 
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="shadow-lg border-0" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
        <div className="bg-primary text-white text-center p-4 rounded-top">
          <h4 className="fw-bold mb-0">HỆ THỐNG QUẢN TRỊ</h4>
        </div>
        <Card.Body className="p-4">
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Email / Username</Form.Label>
              <Form.Control 
                type="email"
                isInvalid={!!error} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </Form.Group>
            
            <Form.Group className="mb-2">
              <Form.Label className="small fw-bold">Mật khẩu</Form.Label>
              <InputGroup>
                <Form.Control 
                  type={showPassword ? "text" : "password"} // 1. Toggle type
                  isInvalid={!!error} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                />
                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Ẩn" : "Hiện"}
                </Button>
              </InputGroup>
              {/* 2. Dòng chữ đỏ hiện dưới ô điền khi sai */}
              {error && <div className="text-danger small mt-2 fw-bold">{error}</div>}
            </Form.Group>
            
            <Button type="submit" className="w-100 fw-bold py-2 mt-3">ĐĂNG NHẬP</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default FormAuth;