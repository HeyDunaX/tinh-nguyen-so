import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet'; // SỬ DỤNG L ĐỂ FIX WARNING
import { supabase } from '../utils/supabaseClient';

const { BaseLayer } = LayersControl;

const MapSection = ({ userRole, userScope, onLocationChange }) => {
  const [locations, setLocations] = useState([]);
  const markerRef = useRef(null);

  // Fix Icon mặc định bằng L để linter không báo unused-vars
  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  useEffect(() => {
    const fetchLocs = async () => {
      let q = supabase.from('locations').select('*');
      if (userRole === 'admin' && userScope) q = q.like('scope_path', `${userScope}%`);
      const { data } = await q;
      if (data) setLocations(data);
    };
    fetchLocs();
  }, [userRole, userScope]);

  // Xử lý kéo thả để lấy tọa độ
  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current;
      if (marker != null && onLocationChange) {
        onLocationChange(marker.getLatLng());
      }
    },
  }), [onLocationChange]);

  return (
    <div className="map-wrapper shadow border rounded-4 overflow-hidden" style={{ height: '600px', position: 'relative' }}>
      <MapContainer center={[10.893, 106.588]} zoom={16} style={{ height: '100%' }}>
        <LayersControl position="topright">
          <BaseLayer checked name="Bản đồ đường bộ">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </BaseLayer>
          {/* CHẾ ĐỘ VỆ TINH GIÚP NHÌN RÕ NÓC NHÀ */}
          <BaseLayer name="Bản đồ vệ tinh">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
        </LayersControl>

        {userRole === 'admin' && (
          <Marker 
            draggable={true} 
            eventHandlers={eventHandlers} 
            position={[10.893, 106.588]} 
            ref={markerRef}
            icon={customIcon}
          >
            <Popup>Kéo tôi để chọn vị trí chính xác</Popup>
          </Marker>
        )}

        {locations.map(loc => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
            <Popup><h6 className="fw-bold m-0">{loc.name}</h6></Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
export default MapSection;