import React, { useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SlideUp from './SlideUp';
import '../stylesheet/MapSection.css'; // Đổi tên file CSS cho đúng nghiệp vụ

// Fix lỗi icon mặc định của Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapSection = ({ userRole = 'viewer' }) => {
  const [filter, setFilter] = useState('all');
  const position = [10.893, 106.588]; // Tọa độ trung tâm khu vực Ấp 40, Xuân Thới Sơn

  // Dữ liệu mẫu để hoàn thiện UI/UX
  const mockLocations = [
    { id: 1, name: "Hộ bà Nguyễn Thị A", type: "poor", lat: 10.894, lng: 106.589, status: "Cần hỗ trợ gạo", phone: "090xxxxxxx" },
    { id: 2, name: "Điểm rác phát sinh - Cầu X", type: "waste", lat: 10.892, lng: 106.587, status: "Cần xe cẩu", note: "Rác thải sinh hoạt ùn ứ" },
    { id: 3, name: "Ông Trần Văn B (Neo đơn)", type: "elderly", lat: 10.895, lng: 106.590, status: "Sức khỏe yếu", phone: "091xxxxxxx" },
    { id: 4, name: "Đường hư tổ 5", type: "road", lat: 10.891, lng: 106.586, status: "Sụp ổ voi", note: "Nguy hiểm khi trời mưa" },
  ];

  const categories = [
    { id: 'all', label: 'Tất cả', color: 'secondary' },
    { id: 'poor', label: 'Hộ nghèo', color: 'danger' },
    { id: 'elderly', label: 'Người già neo đơn', color: 'warning' },
    { id: 'waste', label: 'Điểm rác/Kênh rạch', color: 'primary' },
    { id: 'road', label: 'Đường hư', color: 'dark' },
  ];

  const filteredData = filter === 'all' ? mockLocations : mockLocations.filter(item => item.type === filter);

  return (
    <Container id="map-section" fluid className="map-section-container">
      <SlideUp>
        <div className="text-center mb-4">
          <h2 className="map-title">HỆ THỐNG BẢN ĐỒ SỐ</h2>
          <p className="map-subtitle">Quản lý an sinh xã hội và hạ tầng địa bàn Ấp 40</p>
        </div>

        {/* Thanh lọc dữ liệu - Nút to cho cô chú dễ bấm */}
        <Row className="justify-content-center mb-4 g-2">
          {categories.map(cat => (
            <Col xs="auto" key={cat.id}>
              <Button 
                variant={filter === cat.id ? cat.color : `outline-${cat.color}`}
                className="filter-btn fw-bold px-4 rounded-pill"
                onClick={() => setFilter(cat.id)}
              >
                {cat.label}
              </Button>
            </Col>
          ))}
        </Row>

        {/* Khu vực Bản đồ */}
        <Row className="justify-content-center">
          <Col lg={11}>
            <div className="map-wrapper shadow-lg border">
              <MapContainer center={position} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap'
                />
                {filteredData.map(loc => (
                  <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                    <Popup className="custom-popup">
                      <div className="p-1">
                        <h6 className="fw-bold text-primary mb-1">{loc.name}</h6>
                        <Badge bg="info" className="mb-2">{categories.find(c => c.id === loc.type)?.label}</Badge>
                        <p className="small mb-1"><strong>Trạng thái:</strong> {loc.status}</p>
                        {loc.phone && <p className="small mb-1"><strong>SĐT:</strong> {loc.phone}</p>}
                        {loc.note && <p className="small mb-2 text-muted italic">*{loc.note}</p>}
                        
                        {/* Chỉ hiện nút Cập nhật cho Trưởng ấp */}
                        {userRole === 'truong_ap' && (
                          <Button size="sm" variant="outline-primary" className="w-100 mt-2">Cập nhật thông tin</Button>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </Col>
        </Row>
      </SlideUp>
    </Container>
  );
};

export default MapSection;