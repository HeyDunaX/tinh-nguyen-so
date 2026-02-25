export const normalizeInput = (str) => {
  if (!str) return "";
  return str.trim()
    .replace(/\s+/g, ' ') // Xóa dấu cách thừa
    .toLowerCase()
    .replace(/(^\w|\s\w)/g, m => m.toUpperCase()) // Viết hoa chuẩn tên riêng
    .replace(/Ap/g, "Ấp") 
    .replace(/To/g, "Tổ");
};

// Hàm dẫn đường Google Maps
export const getGoogleMapsUrl = (lat, lng) => {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
};