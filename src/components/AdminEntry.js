import React, { useState } from 'react';
import { normalizeInput } from '../utils/formatters';
// ... các import icon cũ

const AdminEntry = ({ userScope }) => {
    const [formData, setFormData] = useState({ name: '', type: '', note: '' });

    // Tự động sửa lỗi khi cô chú nhấn ra khỏi ô nhập
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: normalizeInput(value) });
    };

    return (
        // ... (Trong phần render Form.Control)
        <Form.Control 
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            onBlur={handleBlur} // NẮN CHÍNH TẢ TẠI ĐÂY
            placeholder="Ví dụ: Hộ bà B, Tổ 5..." 
            className="large-input" 
        />
    );
};