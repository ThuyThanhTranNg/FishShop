# Dự án Web Bán Cá (Fish Shop)

Dự án website thương mại điện tử chuyên bán cá cảnh / thủy sinh / hải sản sử dụng **React (Frontend)** và **Node.js/Express + MongoDB (Backend)** theo kiến trúc **Feature-based (hướng tính năng)**.

---

## Cấu trúc thư mục (Feature-based Architecture)

```text
ShopFish/
├── client/                               # Giao diện người dùng (React)
│   ├── public/                           # File tĩnh (favicon, index.html, v.v.)
│   └── src/
│       ├── assets/                       # Ảnh, icon, CSS dùng chung
│       │   ├── icons/
│       │   ├── images/
│       │   └── styles/
│       ├── components/                   # Component dùng chung toàn app
│       │   ├── common/                   # Button, Input, Modal, Table, v.v.
│       │   └── layout/                   # Header, Footer, Sidebar, Navbar
│       ├── configs/                      # Cấu hình routes, axios client, constants
│       ├── context/                      # Global state (Theme, Auth Context, v.v.)
│       ├── hooks/                        # Custom React hooks dùng chung
│       ├── services/                     # API client & helpers dùng chung
│       ├── utils/                        # Hàm tiện ích (format tiền tệ, ngày tháng, v.v.)
│       └── features/                     # Chia theo từng tính năng (Feature-based)
│           ├── auth/                     # Tính năng: Đăng ký / Đăng nhập / Xác thực
│           │   ├── components/
│           │   ├── hooks/
│           │   ├── services/
│           │   └── pages/
│           ├── products/                 # Tính năng: Danh mục cá, chi tiết cá, bộ lọc
│           │   ├── components/
│           │   ├── hooks/
│           │   ├── services/
│           │   └── pages/
│           ├── cart/                     # Tính năng: Giỏ hàng
│           │   ├── components/
│           │   ├── hooks/
│           │   ├── services/
│           │   └── pages/
│           ├── orders/                   # Tính năng: Đặt hàng & thanh toán (Checkout)
│           │   ├── components/
│           │   ├── hooks/
│           │   ├── services/
│           │   └── pages/
│           ├── reviews/                  # Tính năng: Đánh giá & nhận xét cá
│           │   ├── components/
│           │   ├── hooks/
│           │   ├── services/
│           │   └── pages/
│           ├── user/                     # Tính năng: Thông tin cá nhân & sổ địa chỉ
│           │   ├── components/
│           │   ├── hooks/
│           │   ├── services/
│           │   └── pages/
│           └── admin/                    # Tính năng: Dashboard quản trị (kho cá, đơn hàng)
│               ├── components/
│               ├── hooks/
│               ├── services/
│               └── pages/
│
└── server/                               # Backend REST API (Node.js/Express + MongoDB)
    └── src/
        ├── configs/                      # Kết nối MongoDB (Mongoose), env, v.v.
        ├── middlewares/                  # Xác thực JWT, bắt lỗi (ErrorHandler), upload ảnh
        ├── utils/                        # Hàm tiện ích xử lý logic
        └── features/                     # Chia theo từng tính năng
            ├── auth/                     # Đăng nhập, đăng ký, JWT token
            │   ├── controllers/
            │   ├── models/
            │   ├── routes/
            │   └── services/
            ├── products/                 # Quản lý cá (loài cá, môi trường nước, giá cả, số lượng)
            │   ├── controllers/
            │   ├── models/
            │   ├── routes/
            │   └── services/
            ├── cart/                     # Xử lý thêm/bớt giỏ hàng
            │   ├── controllers/
            │   ├── models/
            │   ├── routes/
            │   └── services/
            ├── orders/                   # Tạo đơn hàng, thanh toán, trạng thái giao vận
            │   ├── controllers/
            │   ├── models/
            │   ├── routes/
            │   └── services/
            ├── users/                    # Quản lý tài khoản khách hàng
            │   ├── controllers/
            │   ├── models/
            │   ├── routes/
            │   └── services/
            ├── reviews/                  # Đánh giá sản phẩm
            │   ├── controllers/
            │   ├── models/
            │   ├── routes/
            │   └── services/
            └── admin/                    # Thống kê doanh thu, quản lý danh mục và hệ thống
                ├── controllers/
                ├── routes/
                └── services/
```
