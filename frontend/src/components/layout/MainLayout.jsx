import { Outlet, Link } from 'react-router-dom';
import { Fish, ShoppingBag, User } from 'lucide-react';

export default function MainLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: '#ffffff'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#0284c7', fontWeight: 'bold', fontSize: '1.25rem' }}>
          <Fish size={28} />
          <span>AquaCraft</span>
        </Link>
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/products" style={{ textDecoration: 'none', color: '#475569' }}>Sản phẩm</Link>
          <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none', color: '#475569' }}>
            <ShoppingBag size={20} />
            <span>Giỏ hàng</span>
          </Link>
          <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none', color: '#475569' }}>
            <User size={20} />
            <span>Tài khoản</span>
          </Link>
        </nav>
      </header>

      <main style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>

      <footer style={{
        padding: '1.5rem 2rem',
        borderTop: '1px solid #e2e8f0',
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: '0.875rem'
      }}>
        &copy; {new Date().getFullYear()} AquaCraft - Hệ thống thủy sinh & cá cảnh cao cấp.
      </footer>
    </div>
  );
}

