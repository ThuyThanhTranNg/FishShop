import { ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShieldCheck color="#16a34a" /> Đăng nhập
      </h2>
      <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Đăng nhập vào tài khoản AquaCraft của bạn
      </p>
      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', color: '#334155', marginBottom: '0.25rem' }}>Email</label>
          <input type="email" placeholder="email@example.com" style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', color: '#334155', marginBottom: '0.25rem' }}>Mật khẩu</label>
          <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        </div>
        <button type="submit" style={{ padding: '0.625rem', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
