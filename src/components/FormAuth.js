import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const FormAuth = ({ setIsLoggedIn, setUserRole, setUserScope }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) return setError('Tài khoản hoặc mật khẩu không chính xác!');
    
    const { data: p } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
    setIsLoggedIn(true); setUserRole(p.role); setUserScope(p.managed_scope);
    navigate('/admin'); // TỰ ĐỘNG CHUYỂN TRANG
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="shadow-lg border-0" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
        <div className="bg-primary text-white text-center p-4 rounded-top">
          <h4 className="fw-bold mb-0">HỆ THỐNG QUẢN TRỊ</h4>
        </div>
        <Card.Body className="p-4">
          {error && <Alert variant="danger" className="py-2 small text-center">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Email / Username</Form.Label>
              <Form.Control isInvalid={!!error} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="small fw-bold">Mật khẩu</Form.Label>
              <Form.Control type="password" isInvalid={!!error} onChange={e => setPassword(e.target.value)} required />
            </Form.Group>
            <Button type="submit" className="w-100 fw-bold py-2">ĐĂNG NHẬP</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default FormAuth;