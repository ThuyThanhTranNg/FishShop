import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, LogIn, AlertCircle } from 'lucide-react';
import authService from '../services/authService.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      if (data?.user?.role === 'admin') {
        navigate('/admin/products');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập không thành công');
    } finally {
      setLoading(false);
    }
  };

  const handleFillAdmin = () => {
    setEmail('admin@aquacraft.com');
    setPassword('admin123');
  };

  return (
    <div
      style={{
        maxWidth: '420px',
        margin: '3rem auto',
        padding: '2rem',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '4px',
            backgroundColor: '#f0fdf4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #bbf7d0',
          }}
        >
          <ShieldCheck color="#16a34a" size={20} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
            Đăng nhập hệ thống
          </h2>
        </div>
      </div>

      <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
        Đăng nhập để quản lý cá cảnh, thủy sinh và đơn hàng.
      </p>

      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem',
            marginBottom: '1rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            fontSize: '0.875rem',
            borderRadius: '4px',
          }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#334155', marginBottom: '0.35rem' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@aquacraft.com"
            required
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '4px',
              border: '1px solid #cbd5e1',
              fontSize: '0.875rem',
              outline: 'none',
              backgroundColor: '#ffffff',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#334155', marginBottom: '0.35rem' }}>
            Mật khẩu
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '4px',
              border: '1px solid #cbd5e1',
              fontSize: '0.875rem',
              outline: 'none',
              backgroundColor: '#ffffff',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '0.5rem',
            padding: '0.625rem',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <LogIn size={16} />
          {loading ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>

        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginTop: '0.5rem' }}>
          <button
            type="button"
            onClick={handleFillAdmin}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#f8fafc',
              border: '1px dashed #cbd5e1',
              borderRadius: '4px',
              fontSize: '0.8125rem',
              color: '#475569',
              cursor: 'pointer',
            }}
          >
            Điền tài khoản Admin mẫu (admin@aquacraft.com)
          </button>
        </div>
      </form>
    </div>
  );
}
