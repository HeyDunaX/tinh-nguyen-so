

export const normalizeInput = (str) => {
  if (!str) return "";
  return str.trim()
    .replace(/\s+/g, ' ') 
    .toLowerCase()
    .replace(/(^\w|\s\w)/g, m => m.toUpperCase()) 
    .replace(/Ap/g, "Ấp") 
    .replace(/To/g, "Tổ");
};


export const getGoogleMapsUrl = (lat, lng) => {
  // api=1 & destination=lat,lng là cú pháp chuẩn để kích hoạt chế độ Directions
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
};