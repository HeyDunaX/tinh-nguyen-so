import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from '../utils/supabaseClient';
import { getGoogleMapsUrl } from '../utils/formatter';
import SlideUp from './SlideUp';
import '../stylesheet/MapSection.css';

const { BaseLayer } = LayersControl;

// Thành phần bổ trợ để tự động di chuyển tâm bản đồ khi Admin chọn vị trí mới
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView([position.lat, position.lng]);
  }, [position, map]);
  return null;
};

const MapSection = ({ userRole = 'viewer', userScope = '', selectedPos, onPosChange }) => {
  const [filter, setFilter] = useState('all');
  const [locations, setLocations] = useState([]);
  const markerRef = useRef(null);

  // 1. Tải dữ liệu từ Supabase dựa trên phạm vi quản lý (scope_path)
  useEffect(() => {
    const fetchLocations = async () => {
      let query = supabase.from('locations').select('*');
      
      // Nếu là admin ấp, chỉ hiện các điểm thuộc ấp đó
      if (userRole !== 'viewer' && userScope) {
        query = query.like('scope_path', `${userScope}%`);
      }

      const { data, error } = await query;
      if (!error && data) setLocations(data); 
    };

    fetchLocations();
  }, [userRole, userScope]);

  // 2. Cấu hình Icon cho Marker
  const customIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  // 3. Xử lý sự kiện kéo thả Marker để định vị
  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current;
      if (marker != null && onPosChange) {
        // Cập nhật tọa độ mới về App.js để không bị nhảy lại vị trí cũ
        onPosChange(marker.getLatLng());
      }
    },
  }), [onPosChange]);

  const categories = [
    { id: 'all', label: 'Tất cả', color: 'secondary' },
    { id: 'poor', label: 'Hộ nghèo', color: 'danger' },
    { id: 'waste', label: 'Điểm rác', color: 'primary' },
    { id: 'road', label: 'Đường hư', color: 'dark' },
  ];

  const filteredData = filter === 'all' ? locations : locations.filter(loc => loc.type === filter);

  return (
    <Container id="map-section" fluid className="map-section-container bg-white py-5">
      <SlideUp>
        {/* Tiêu đề hệ thống */}
        <Row className="justify-content-center text-center mb-4">
          <Col lg={8}>
            <h2 className="map-title text-primary fw-bold text-uppercase">Hệ thống bản đồ số tình nguyện</h2>
            <p className="map-subtitle text-muted">Đơn vị: {userScope || 'Toàn xã Xuân Thới Sơn'}</p>
          </Col>
        </Row>

        {/* Bộ lọc loại hình (UX 1 chạm) */}
        <Row className="justify-content-center mb-4 g-2">
          {categories.map(cat => (
            <Col xs="auto" key={cat.id}>
              <Button 
                variant={filter === cat.id ? cat.color : `outline-${cat.color}`}
                className="px-4 rounded-pill fw-bold shadow-sm"
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
            <div className="map-wrapper shadow-lg border rounded-4 overflow-hidden" style={{ height: '600px', position: 'relative' }}>
              <MapContainer 
                center={selectedPos || [10.893, 106.588]} 
                zoom={16} 
                style={{ height: '100%', width: '100%' }}
              >
                <LayersControl position="topright">
                  <BaseLayer checked name="Bản đồ đường bộ">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  </BaseLayer>
                  <BaseLayer name="Bản đồ vệ tinh">
                    <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                  </BaseLayer>
                </LayersControl>

                {/* Chế độ Admin: Hiển thị Marker định vị có thể kéo thả */}
                {userRole === 'admin' && (
                  <>
                    <RecenterMap position={selectedPos} />
                    <Marker 
                      draggable={true} 
                      eventHandlers={eventHandlers} 
                      position={selectedPos} 
                      ref={markerRef} 
                      icon={customIcon}
                    >
                      <Popup className="fw-bold text-center">
                        📍 Vị trí đang chọn<br/>
                        (Kéo tôi để thay đổi)
                      </Popup>
                    </Marker>
                  </>
                )}

                {/* Hiển thị các điểm đã lưu trên bản đồ */}
                {filteredData.map(loc => (
                  <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
                    <Popup>
                      <div className="p-1 text-center" style={{ minWidth: '150px' }}>
                        <h6 className="fw-bold text-primary mb-1">{loc.name}</h6>
                        <Badge bg="info" className="mb-2">
                          {categories.find(c => c.id === loc.type)?.label || 'Khác'}
                        </Badge>
                        <p className="small mb-2 text-dark text-start italic">"{loc.status}"</p>
                        
                        {/* Nút chỉ đường cho Đoàn viên (UX 3 chạm) */}
                        <Button 
                          variant="success" 
                          size="sm" 
                          className="w-100 fw-bold rounded-pill" 
                          onClick={() => window.open(getGoogleMapsUrl(loc.lat, loc.lng), '_blank')}
                        >
                          🚩 CHỈ ĐƯỜNG NGAY
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            <p className="text-center mt-3 text-muted small">
              * Mẹo: Sử dụng nút "Bản đồ vệ tinh" ở góc phải để nhìn rõ nhà dân hơn.
            </p>
          </Col>
        </Row>
      </SlideUp>
    </Container>
  );
};

export default MapSection;