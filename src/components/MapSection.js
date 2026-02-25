import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import { supabase } from '../utils/supabaseClient';
import { getGoogleMapsUrl } from '../utils/formatter';
import SlideUp from './SlideUp';
import '../stylesheet/MapSection.css';

const { BaseLayer } = LayersControl;

const MapSection = ({ userRole = 'viewer', userScope = '', onPosChange }) => {
  const [filter, setFilter] = useState('all');
  const [locations, setLocations] = useState([]);
  const markerRef = useRef(null);

  // Lấy dữ liệu từ DB (Sử dụng useEffect, supabase, setLocations)
  useEffect(() => {
    const fetchLocations = async () => {
      let query = supabase.from('locations').select('*');
      
      if (userRole !== 'viewer' && userScope) {
        query = query.like('scope_path', `${userScope}%`);
      }

      const { data, error } = await query;
      if (!error && data) setLocations(data); 
    };

    fetchLocations();
  }, [userRole, userScope]);

  const customIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41]
  });

  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current;
      if (marker != null && onPosChange) onPosChange(marker.getLatLng());
    },
  }), [onPosChange]);

  const categories = [
    { id: 'all', label: 'Tất cả', color: 'secondary' },
    { id: 'poor', label: 'Hộ nghèo', color: 'danger' },
    { id: 'waste', label: 'Điểm rác', color: 'primary' },
    { id: 'road', label: 'Đường hư', color: 'dark' },
  ];

  // Sử dụng filter và locations để lọc dữ liệu
  const filteredData = filter === 'all' ? locations : locations.filter(loc => loc.type === filter);

  return (
    <Container id="map-section" fluid className="map-section-container bg-white py-5">
      <SlideUp>
        {/* Sử dụng Row & Col */}
        <Row className="justify-content-center text-center mb-4">
          <Col lg={8}>
            <h2 className="map-title text-primary fw-bold text-uppercase">Hệ thống bản đồ số</h2>
            <p className="map-subtitle text-muted">Đơn vị quản lý: {userScope || 'Toàn quốc'}</p>
          </Col>
        </Row>

        <Row className="justify-content-center mb-4 g-2">
          {categories.map(cat => (
            <Col xs="auto" key={cat.id}>
              <Button 
                variant={filter === cat.id ? cat.color : `outline-${cat.color}`}
                className="px-4 rounded-pill fw-bold shadow-sm"
                onClick={() => setFilter(cat.id)} // Sử dụng setFilter
              >
                {cat.label}
              </Button>
            </Col>
          ))}
        </Row>

        <Row className="justify-content-center">
          <Col lg={11}>
            <div className="map-wrapper shadow-lg border rounded-4 overflow-hidden" style={{ height: '650px', position: 'relative' }}>
              <MapContainer center={[10.893, 106.588]} zoom={16} style={{ height: '100%', width: '100%' }}>
                <LayersControl position="topright">
                  <BaseLayer checked name="Bản đồ đường bộ">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  </BaseLayer>
                  <BaseLayer name="Bản đồ vệ tinh">
                    <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                  </BaseLayer>
                </LayersControl>

                {userRole === 'admin' && (
                  <Marker draggable={true} eventHandlers={eventHandlers} position={[10.893, 106.588]} ref={markerRef} icon={customIcon}>
                    <Popup className="fw-bold">Kéo tôi đến vị trí chính xác</Popup>
                  </Marker>
                )}

                {filteredData.map(loc => (
                  <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
                    <Popup>
                      <div className="p-1">
                        <h6 className="fw-bold text-primary mb-1">{loc.name}</h6>
                        <Badge bg="info" className="mb-2">
                          {categories.find(c => c.id === loc.type)?.label || 'Khác'}
                        </Badge>
                        <p className="small mb-2 text-dark">{loc.status}</p>
                        <Button 
                          variant="success" 
                          size="sm" 
                          className="w-100 fw-bold" 
                          onClick={() => window.open(getGoogleMapsUrl(loc.lat, loc.lng), '_blank')}
                        >
                          🚩 DẪN ĐƯỜNG ĐẾN ĐÂY
                        </Button>
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