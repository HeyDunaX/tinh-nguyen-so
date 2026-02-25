import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SlideUp from './SlideUp';
import '../stylesheet/MapSection.css';
import { supabase } from '../utils/supabaseClient'; // Kết nối Supabase
import { getGoogleMapsUrl } from '../utils/formatters'; // Hàm dẫn đường

// Fix lỗi hiển thị Marker của Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapSection = ({ userRole = 'viewer', userScope = '' }) => {
  const [filter, setFilter] = useState('all');
  const [locations, setLocations] = useState([]);
  const position = [10.893, 106.588]; // Trung tâm mặc định (Xuân Thới Sơn)

  // Lấy dữ liệu thực từ Supabase theo phân cấp hành chính (Scope)
  useEffect(() => {
    const fetchLocations = async () => {
      let query = supabase.from('locations').select('*');
      
      // Nếu là Admin/Trưởng ấp, chỉ lấy dữ liệu thuộc phạm vi quản lý của họ
      if (userRole !== 'viewer' && userScope) {
        query = query.like('scope_path', `${userScope}%`);
      }

      const { data, error } = await query;
      if (!error) setLocations(data);
    };

    fetchLocations();
  }, [userRole, userScope]);

  const categories = [
    { id: 'all', label: 'Tất cả', color: 'secondary' },
    { id: 'poor', label: 'Hộ nghèo', color: 'danger' },
    { id: 'elderly', label: 'Người già neo đơn', color: 'warning' },
    { id: 'waste', label: 'Điểm rác/Kênh rạch', color: 'primary' },
    { id: 'road', label: 'Đường hư', color: 'dark' },
  ];

  const filteredData = filter === 'all' ? locations : locations.filter(item => item.type === filter);

  return (
    <Container id="map-section" fluid className="map-section-container">
      <SlideUp>
        <div className="text-center mb-4">
          <h2 className="map-title">HỆ THỐNG BẢN ĐỒ SỐ</h2>
          <p className="map-subtitle">Quản lý an sinh xã hội toàn quốc - Đơn vị: {userScope || 'Toàn quốc'}</p>
        </div>

        {/* Bộ lọc cho cô chú dễ bấm */}
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

        <Row className="justify-content-center">
          <Col lg={11}>
            <div className="map-wrapper shadow-lg border">
              <MapContainer center={position} zoom={16} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap'
                />
                {filteredData.map(loc => (
                  <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                    <Popup className="custom-popup">
                      <div className="p-1">
                        <h6 className="fw-bold text-primary mb-1">{loc.name}</h6>
                        <Badge bg="info" className="mb-2">
                          {categories.find(c => c.id === loc.type)?.label}
                        </Badge>
                        <p className="small mb-1"><strong>Trạng thái:</strong> {loc.status}</p>
                        
                        {/* Nút Dẫn đường dành cho Đoàn viên */}
                        <Button 
                          variant="success" 
                          size="sm" 
                          className="w-100 mt-2 fw-bold"
                          onClick={() => window.open(getGoogleMapsUrl(loc.lat, loc.lng), '_blank')}
                        >
                          🚩 CHỈ ĐƯỜNG ĐẾN ĐÂY
                        </Button>

                        {/* Chỉ hiện nút Cập nhật cho Trưởng ấp/Admin */}
                        {userRole !== 'viewer' && (
                          <Button size="sm" variant="outline-primary" className="w-100 mt-2">
                            Cập nhật thông tin
                          </Button>
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