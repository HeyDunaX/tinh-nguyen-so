// Tự động sửa lỗi: Xóa dấu cách thừa, viết hoa tên riêng, chuẩn hóa địa danh
export const normalizeInput = (str) => {
  if (!str) return "";
  return str.trim()
    .replace(/\s+/g, ' ') 
    .toLowerCase()
    .replace(/(^\w|\s\w)/g, m => m.toUpperCase()) 
    .replace(/Ap/g, "Ấp") 
    .replace(/To/g, "Tổ");
};

// Hàm tạo URL dẫn đường Google Maps
export const getGoogleMapsUrl = (lat, lng) => {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
};