import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout.jsx';
import AdminLayout from '../components/layout/AdminLayout.jsx';
import ProductListPage from '../features/products/pages/ProductListPage.jsx';
import CartPage from '../features/cart/pages/CartPage.jsx';
import LoginPage from '../features/auth/pages/LoginPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ProductListPage />,
      },
      {
        path: 'products',
        element: <ProductListPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>Admin Dashboard</h1>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Thống kê tổng quan hệ thống AquaCraft.</p>
          </div>
        ),
      },
      {
        path: 'products',
        element: (
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>Quản lý sản phẩm</h1>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Danh sách và quản lý cá cảnh, thủy sinh.</p>
          </div>
        ),
      },
      {
        path: 'orders',
        element: (
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>Quản lý đơn hàng</h1>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Theo dõi và xử lý đơn hàng.</p>
          </div>
        ),
      },
      {
        path: 'users',
        element: (
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>Quản lý người dùng</h1>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Quản lý tài khoản và phân quyền.</p>
          </div>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
