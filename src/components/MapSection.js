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

  // FIX WARNING: Sử dụng L để định nghĩa Icon chuẩn
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

  return (
    <Container id="map-section" fluid className="map-section-container bg-white py-5">
      <SlideUp>
        <div className="text-center mb-4">
          <h2 className="map-title text-primary fw-bold">HỆ THỐNG BẢN ĐỒ SỐ</h2>
          <p className="map-subtitle text-muted">Dữ liệu đơn vị: {userScope || 'Toàn quốc'}</p>
        </div>

        <div className="map-wrapper shadow-lg border rounded-4 overflow-hidden" style={{ height: '600px' }}>
          <MapContainer center={[10.893, 106.588]} zoom={16} style={{ height: '100%', width: '100%' }}>
            <LayersControl position="topright">
              <BaseLayer checked name="Bản đồ đường bộ">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </BaseLayer>
              {/* NHÚNG BẢN ĐỒ VỆ TINH */}
              <BaseLayer name="Bản đồ vệ tinh">
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
              </BaseLayer>
            </LayersControl>

            {/* CHẾ ĐỘ GHIM ĐỘNG: Kéo thả để lấy tọa độ */}
            {userRole === 'admin' && (
              <Marker draggable={true} eventHandlers={eventHandlers} position={[10.893, 106.588]} ref={markerRef} icon={customIcon}>
                <Popup>Kéo tôi đến vị trí chính xác cần ghim</Popup>
              </Marker>
            )}

            {locations.map(loc => (
              <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
                <Popup>
                  <div className="p-1">
                    <h6 className="fw-bold text-primary">{loc.name}</h6>
                    <Badge bg="info" className="mb-2">{loc.type}</Badge>
                    <p className="small mb-1">{loc.status}</p>
                    <Button variant="success" size="sm" className="w-100 fw-bold" onClick={() => window.open(getGoogleMapsUrl(loc.lat, loc.lng), '_blank')}>🚩 DẪN ĐƯỜNG</Button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </SlideUp>
    </Container>
  );
};
export default MapSection;