import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import SlideUp from './SlideUp';
import '../stylesheet/AdminEntry.css';
import { FaEdit, FaCheckCircle, FaExclamationTriangle, FaMapMarkerAlt } from 'react-icons/fa';

const AdminEntry = () => {
    // Dữ liệu mẫu cho danh sách lịch sử cập nhật (Dùng lại cấu trúc Award-item)
    const updateHistory = [
        { title: 'Đã cập nhật: Hộ bà Nguyễn Thị A (Hộ nghèo)', date: '10:30 - 22/02', status: 'Thành công', icon: <FaCheckCircle />, color: '#28a745' },
        { title: 'Báo cáo mới: Điểm rác Tổ 5', date: '08:15 - 22/02', status: 'Chờ xử lý', icon: <FaExclamationTriangle />, color: '#ffd100' },
        { title: 'Đã cập nhật: Đường hư Tổ 40', date: 'Hôm qua', status: 'Hoàn thành', icon: <FaCheckCircle />, color: '#28a745' },
    ];

    return (
        <Container id="admin-entry" fluid className="admin-bg py-5">
            <Container>
                <SlideUp>
                    <div className="text-center mb-5">
                        <h2 className="admin-title">CẬP NHẬT HOẠT ĐỘNG </h2>
                        <p className="admin-subtitle">Khu vực dành riêng cho Cán bộ Chi đoàn và Trưởng ấp 40</p>
                    </div>
                </SlideUp>

                <Row className="justify-content-center">
                    {/* CỘT TRÁI: FORM NHẬP LIỆU (Thiết kế cực đơn giản) */}
                    <Col lg={5} className="mb-5">
                        <div className="entry-form-card shadow-sm">
                            <h4 className="form-header"><FaEdit className="me-2" /> Thêm thông tin mới</h4>
                            <Form>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">1. Tên địa điểm/Hộ gia đình</Form.Label>
                                    <Form.Control type="text" placeholder="Ví dụ: Hộ ông B, Tổ 5..." className="large-input" />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">2. Loại thông tin</Form.Label>
                                    <Form.Select className="large-input">
                                        <option>-- Chọn loại --</option>
                                        <option>Hộ nghèo/Khó khăn</option>
                                        <option>Người già neo đơn</option>
                                        <option>Điểm rác/Môi trường</option>
                                        <option>Hạ tầng (Đường, đèn...)</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">3. Tình trạng cụ thể</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Mô tả ngắn gọn hoàn cảnh..." className="large-input" />
                                </Form.Group>

                                <Button variant="primary" className="w-100 save-btn">
                                    <FaMapMarkerAlt className="me-2" /> GỬI THÔNG TIN LÊN BẢN ĐỒ
                                </Button>
                            </Form>
                        </div>
                    </Col>

                    {/* CỘT PHẢI: LỊCH SỬ CẬP NHẬT (Novelty - Tận dụng style Awards) */}
                    <Col lg={6}>
                        <h4 className="history-header">Nhật ký hoạt động gần đây</h4>
                        <div className="history-list">
                            {updateHistory.map((item, index) => (
                                <SlideUp key={index}>
                                    <div className="update-item-card">
                                        <div className="update-icon" style={{ backgroundColor: item.color }}>
                                            {item.icon}
                                        </div>
                                        <div className="update-info">
                                            <span className="update-time">{item.date}</span>
                                            <h5 className="update-title">{item.title}</h5>
                                            <span className="update-status" style={{ color: item.color }}>● {item.status}</span>
                                        </div>
                                    </div>
                                </SlideUp>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default AdminEntry;