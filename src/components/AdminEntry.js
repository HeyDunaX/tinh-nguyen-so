import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { normalizeInput } from '../utils/formatter';
import { supabase } from '../utils/supabaseClient';

const AdminEntry = ({ userScope, selectedPos }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('poor');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleSave = async () => {
    if (!selectedPos) return setMessage({ type: 'danger', content: 'Vui lòng kéo Marker trên bản đồ để định vị!' });
    setLoading(true);
    const { error } = await supabase.from('locations').insert([{
      name: normalizeInput(name), type, status: note,
      lat: selectedPos.lat, lng: selectedPos.lng, scope_path: userScope
    }]);
    
    if (error) setMessage({ type: 'danger', content: 'Lỗi: ' + error.message });
    else {
      setMessage({ type: 'success', content: 'Đã ghi nhận dữ liệu thành công!' });
      setName(''); setNote('');
    }
    setLoading(false);
  };

  return (
    <Container className="py-5 bg-light">
      <Card className="border-0 shadow-sm p-4 rounded-4">
        <h4 className="fw-bold text-primary mb-4">CẬP NHẬT HOẠT ĐỘNG ĐỊA BÀN</h4>
        {message.content && <Alert variant={message.type}>{message.content}</Alert>}
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Label className="fw-bold">Tên địa điểm/Hộ gia đình</Form.Label>
              <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder="Ví dụ: Hộ bà Bảy..." />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label className="fw-bold">Loại hình</Form.Label>
              <Form.Select value={type} onChange={e => setType(e.target.value)}>
                <option value="poor">Hộ nghèo</option>
                <option value="waste">Điểm rác</option>
                <option value="road">Đường hư</option>
              </Form.Select>
            </Col>
          </Row>
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Tình trạng cụ thể</Form.Label>
            <Form.Control as="textarea" rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Mô tả thực trạng..." />
          </Form.Group>
          <div className="alert alert-secondary py-2 small">
            📍 Tọa độ ghim: {selectedPos ? `${selectedPos.lat.toFixed(5)}, ${selectedPos.lng.toFixed(5)}` : 'Chưa chọn'}
          </div>
          <Button disabled={loading} onClick={handleSave} variant="primary" className="w-100 py-3 fw-bold shadow">
            {loading ? 'ĐANG LƯU...' : 'GHI NHẬN LÊN BẢN ĐỒ'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};
export default AdminEntry;