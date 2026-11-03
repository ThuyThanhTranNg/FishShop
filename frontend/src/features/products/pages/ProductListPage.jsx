import { Fish } from 'lucide-react';

export default function ProductListPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Fish color="#0284c7" /> Danh sách sinh vật cảnh & thủy sinh
      </h1>
      <p style={{ color: '#64748b' }}>
        Chào mừng đến với cửa hàng cá cảnh AquaCraft. Các sản phẩm mới nhất sẽ được cập nhật tại đây.
      </p>
    </div>
  );
}
