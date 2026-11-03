import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, ArrowLeft } from 'lucide-react';

export default function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{
        width: '240px',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#38bdf8', marginBottom: '1rem' }}>
          AquaCraft Admin
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', textDecoration: 'none' }}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/products" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', textDecoration: 'none' }}>
            <Package size={18} /> Quản lý sản phẩm
          </Link>
          <Link to="/admin/orders" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', textDecoration: 'none' }}>
            <ShoppingCart size={18} /> Quản lý đơn hàng
          </Link>
          <Link to="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', textDecoration: 'none' }}>
            <Users size={18} /> Quản lý người dùng
          </Link>
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #334155' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>
            <ArrowLeft size={16} /> Về trang chủ
          </Link>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#f8fafc' }}>
        <Outlet />
      </main>
    </div>
  );
}

