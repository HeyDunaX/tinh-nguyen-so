import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SlideUp from './SlideUp';
import '../stylesheet/MapSection.css';
import { supabase } from '../utils/supabaseClient'; // Dùng để fetch dữ liệu thực
import { getGoogleMapsUrl } from '../utils/formatter'; // Hàm dẫn đường

// Fix lỗi icon mặc định của Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapSection = ({ userRole = 'viewer', userScope = '' }) => {
  const [filter, setFilter] = useState('all');
  const [locations, setLocations] = useState([]);
  const position = [10.893, 106.588]; // Tọa độ trung tâm mặc định

  // Lấy dữ liệu thực từ Supabase và lọc theo Ấp/Xã
  useEffect(() => {
    const fetchLocations = async () => {
      let query = supabase.from('locations').select('*');
      
      // Bảo mật: Nếu là Admin, chỉ lấy dữ liệu thuộc scope của mình
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
    { id: 'elderly', label: 'Neo đơn', color: 'warning' },
    { id: 'waste', label: 'Môi trường', color: 'primary' },
    { id: 'road', label: 'Hạ tầng', color: 'dark' },
  ];

  const filteredData = filter === 'all' ? locations : locations.filter(item => item.type === filter);

  return (
    <Container id="map-section" fluid className="map-section-container bg-white">
      <SlideUp>
        <div className="text-center mb-4">
          <h2 className="map-title">HỆ THỐNG BẢN ĐỒ SỐ</h2>
          <p className="map-subtitle">Đơn vị đang xem: {userScope || 'Toàn quốc'}</p>
        </div>

        {/* Dùng Row & Col cho bộ lọc để hết warning */}
        <Row className="justify-content-center mb-4 g-2">
          {categories.map(cat => (
            <Col xs="auto" key={cat.id}>
              <Button 
                variant={filter === cat.id ? cat.color : `outline-${cat.color}`}
                className="filter-btn fw-bold px-3 rounded-pill"
                onClick={() => setFilter(cat.id)}
              >
                {cat.label}
              </Button>
            </Col>
          ))}
        </Row>

        <Row className="justify-content-center">
          <Col lg={11}>
            <div className="map-wrapper shadow-lg border rounded-4 overflow-hidden" style={{ height: '600px' }}>
              <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                {filteredData.map(loc => (
                  <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                    <Popup>
                      <div className="p-1">
                        <h6 className="fw-bold text-primary mb-1">{loc.name}</h6>
                        {/* Dùng Badge ở đây để hết warning */}
                        <Badge bg="info" className="mb-2">
                          {categories.find(c => c.id === loc.type)?.label}
                        </Badge>
                        <p className="small mb-1"><strong>Tình trạng:</strong> {loc.status}</p>
                        
                        {/* Nút Dẫn đường cho Đoàn viên */}
                        <Button 
                          variant="success" 
                          size="sm" 
                          className="w-100 mt-2 fw-bold"
                          onClick={() => window.open(getGoogleMapsUrl(loc.lat, loc.lng), '_blank')}
                        >
                        DẪN ĐƯỜNG ĐẾN ĐÂY
                        </Button>

                        {userRole !== 'viewer' && (
                          <Button size="sm" variant="outline-primary" className="w-100 mt-2">Cập nhật</Button>
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