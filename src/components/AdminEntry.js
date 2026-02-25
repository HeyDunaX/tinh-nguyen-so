import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaMapMarkerAlt } from 'react-icons/fa';
import { normalizeInput } from '../utils/formatter';
import SlideUp from './SlideUp';
import '../stylesheet/AdminEntry.css';

const AdminEntry = ({ userScope }) => {
  const [formData, setFormData] = useState({ name: '', type: '', status: '' });

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Nắn chính tả ngay khi cô chú gõ xong
    setFormData({ ...formData, [name]: normalizeInput(value) });
  };

  return (
    <Container id="admin-entry" className="py-5">
      <SlideUp>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="entry-form-card shadow-sm p-4">
              <h4 className="form-header mb-4"><FaEdit className="me-2" /> Cập nhật cho: {userScope}</h4>
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">1. Tên địa điểm/Hộ gia đình</Form.Label>
                  <Form.Control 
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    onBlur={handleBlur}
                    placeholder="Ví dụ: Hộ bà Nguyễn Thị B..." 
                    className="large-input" 
                  />
                </Form.Group>
                <Button variant="primary" className="w-100 save-btn py-3">
                  <FaMapMarkerAlt className="me-2" /> GHI NHẬN LÊN BẢN ĐỒ
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </SlideUp>
    </Container>
  );
};

export default AdminEntry;