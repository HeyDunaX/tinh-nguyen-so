import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { normalizeInput } from '../utils/formatters';
import { supabase } from '../utils/supabaseClient'; // Import để gửi dữ liệu

const AdminEntry = ({ userScope, selectedPos }) => {
  // 1. Quản lý State
  const [name, setName] = useState('');
  const [type, setType] = useState('poor');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', content: '' });

  // 2. Hàm gửi dữ liệu nghiêm chỉnh lên Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPos) {
      setMsg({ type: 'danger', content: 'Vui lòng kéo Marker trên bản đồ để chọn vị trí!' });
      return;
    }
    if (!name) {
      setMsg({ type: 'danger', content: 'Vui lòng nhập tên hộ hoặc địa điểm!' });
      return;
    }

    setLoading(true);
    setMsg({ type: '', content: '' });

    // Gửi lên bảng locations với đầy đủ Scope phân cấp
    const { error } = await supabase.from('locations').insert([
      {
        name: name,
        type: type,
        status: note,
        lat: selectedPos.lat,
        lng: selectedPos.lng,
        scope_path: userScope, // Gắn mã ấp/xã để phân quyền
        created_at: new Date()
      }
    ]);

    if (error) {
      setMsg({ type: 'danger', content: 'Lỗi hệ thống: ' + error.message });
    } else {
      setMsg({ type: 'success', content: 'Đã ghi nhận dữ liệu thành công lên bản đồ!' });
      setName(''); // Reset form sau khi gửi thành công để xóa warning unused-vars
      setNote('');
    }
    setLoading(false);
  };

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm p-4 rounded-4">
        <h4 className="fw-bold text-primary mb-4 text-uppercase">Cập nhật dữ liệu: {userScope}</h4>
        
        {msg.content && <Alert variant={msg.type} className="small py-2">{msg.content}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Label className="fw-bold">Tên hộ / Địa điểm</Form.Label>
              <Form.Control 
                value={name} // SỬ DỤNG BIẾN 'name' ĐỂ HẾT WARNING
                onChange={(e) => setName(e.target.value)}
                onBlur={(e) => setName(normalizeInput(e.target.value))} 
                placeholder="Ví dụ: Hộ bà Bảy..." 
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label className="fw-bold">Loại hình</Form.Label>
              <Form.Select 
                value={type} // SỬ DỤNG BIẾN 'type'
                onChange={(e) => setType(e.target.value)}
              >
                <option value="poor">Hộ nghèo</option>
                <option value="waste">Điểm rác</option>
                <option value="road">Đường hư</option>
              </Form.Select>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Tình trạng cụ thể</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={2} 
              value={note} // SỬ DỤNG BIẾN 'note'
              onChange={(e) => setNote(e.target.value)} 
              placeholder="Mô tả nhu cầu hỗ trợ..."
            />
          </Form.Group>

          <div className="alert alert-secondary py-2 small">
            📍 Tọa độ hiện tại: {selectedPos ? `${selectedPos.lat.toFixed(5)}, ${selectedPos.lng.toFixed(5)}` : 'Chưa chọn trên bản đồ'}
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            variant="primary" 
            className="w-100 py-3 fw-bold shadow"
          >
            {loading ? 'ĐANG GỬI...' : 'GHI NHẬN LÊN HỆ THỐNG'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AdminEntry;