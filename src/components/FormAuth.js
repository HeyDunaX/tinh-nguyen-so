import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const FormAuth = ({ setIsLoggedIn, setUserRole, setUserScope }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg('Tài khoản hoặc mật khẩu không đúng!'); // HIỆN LỖI
    } else {
      const { data: p } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
      setIsLoggedIn(true);
      setUserRole(p.role);
      setUserScope(p.managed_scope);
      navigate('/admin'); // TỰ ĐỘNG CHUYỂN TRANG
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="shadow-lg border-0" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
        <div className="bg-primary text-white text-center p-4 rounded-top">
          <h4 className="fw-bold mb-0">Hệ thống Quản lý</h4>
        </div>
        <Card.Body className="p-4">
          {errorMsg && <Alert variant="danger" className="py-2 small text-center">{errorMsg}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Email / Username</Form.Label>
              <Form.Control 
                isInvalid={!!errorMsg} // VIỀN ĐỎ KHI SAI
                onChange={(e) => setEmail(e.target.value)} required 
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="small fw-bold">Mật khẩu</Form.Label>
              <Form.Control 
                isInvalid={!!errorMsg} 
                type="password" onChange={(e) => setPassword(e.target.value)} required 
              />
            </Form.Group>
            <Button type="submit" className="w-100 fw-bold py-2">ĐĂNG NHẬP</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default FormAuth;