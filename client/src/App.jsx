import { useState } from 'react';
import { ShoppingBag, Fish, ShieldCheck } from 'lucide-react';

function App() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#0284c7' }}>
          <Fish size={36} /> Fish Shop
        </h1>
        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
          Hệ thống thương mại điện tử chuyên cung cấp cá cảnh & phụ kiện thủy sinh
        </p>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', color: '#334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag color="#0284c7" /> Giỏ hàng & Đơn hàng
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck color="#16a34a" /> Bảo mật & Uy tín
          </div>
        </div>
        <p style={{ color: '#475569' }}>
          Frontend và Backend đã được cài đặt và cấu hình thư viện thành công!
        </p>
      </main>
    </div>
  );
}

export default App;
