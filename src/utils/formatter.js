
export const normalizeInput = (str) => {
  if (!str) return "";
  return str.trim()
    .replace(/\s+/g, ' ') // Xóa khoảng trắng thừa giữa các từ
    .toLowerCase()
    .replace(/(^\w|\s\w)/g, m => m.toUpperCase()) // Viết hoa chữ cái đầu mỗi từ
    .replace(/Ap/g, "Ấp") 
    .replace(/To/g, "Tổ");
};

export const getGoogleMapsUrl = (lat, lng) => {
  // Sử dụng định dạng URL chuẩn của Google Maps Directions API
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
};