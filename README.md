# AquaCraft - E-Commerce Platform

Dự án website thương mại điện tử chuyên cung cấp cá cảnh, thủy sinh và phụ kiện hồ cá cao cấp (**AquaCraft**), xây dựng bằng **React (Frontend)** và **Node.js/Express + MongoDB (Backend)** theo kiến trúc **Feature-Driven Architecture (Hướng tính năng)**.

---

## 1. Cấu trúc dự án (Directory Tree)

```text
AquaCraft/
│
├── frontend/                     # Giao diện người dùng (React 19 + Vite)
│   ├── public/                   # Tài nguyên tĩnh công khai (favicon, svg, ...)
│   ├── src/
│   │   ├── app/                  # Khởi tạo ứng dụng & cấu hình tổng thể
│   │   │   ├── App.jsx           # Root Component
│   │   │   ├── router.jsx        # Tuyến đường điều hướng (React Router)
│   │   │   └── providers.jsx     # Bọc các Providers (Auth, Theme, State)
│   │   ├── assets/               # Hình ảnh, biểu tượng, styles tĩnh
│   │   │   ├── icons/
│   │   │   ├── images/
│   │   │   └── styles/
│   │   ├── components/           # UI Components tái sử dụng
│   │   │   ├── common/           # Button, Modal, Input, Pagination...
│   │   │   └── layout/           # MainLayout (Khách hàng), AdminLayout (Quản trị)
│   │   ├── features/             # Module tính năng nghiệp vụ (Feature-based)
│   │   │   ├── auth/             # Đăng ký, đăng nhập, bảo mật
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── pages/        # LoginPage.jsx...
│   │   │   │   └── services/
│   │   │   ├── products/         # Quản lý cá cảnh, bộ lọc, chi tiết sản phẩm
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── pages/        # ProductListPage.jsx...
│   │   │   │   └── services/
│   │   │   ├── cart/             # Giỏ hàng
│   │   │   ├── orders/           # Thanh toán & đơn hàng
│   │   │   ├── reviews/          # Đánh giá, bình luận
│   │   │   └── users/            # Hồ sơ người dùng
│   │   ├── services/             # Cấu hình API client chung (Axios instance)
│   │   │   └── api.js
│   │   ├── utils/                # Hàm tiện ích chung (format tiền tệ, ngày tháng...)
│   │   │   └── formatters.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      # RESTful API (Express + MongoDB)
│   ├── src/
│   │   ├── server.js             # Khởi động server HTTP & kết nối cơ sở dữ liệu
│   │   ├── app.js                # Cấu hình Express app, middleware & gắn routes
│   │   ├── configs/              # Cấu hình môi trường & MongoDB
│   │   │   ├── db.config.js
│   │   │   └── env.config.js
│   │   ├── middlewares/          # Middleware hệ thống
│   │   │   ├── auth.middleware.js       # Xác thực JWT & phân quyền Admin
│   │   │   ├── error.middleware.js      # Bắt lỗi tập trung (Error Handler)
│   │   │   └── upload.middleware.js     # Upload file/ảnh (Multer)
│   │   ├── features/             # Vertical Slices theo từng nghiệp vụ
│   │   │   ├── auth/             # auth.controller, auth.service, auth.routes
│   │   │   ├── users/            # user.model, user.controller, user.service, user.routes
│   │   │   ├── products/         # product.model, product.controller, product.service, product.routes
│   │   │   ├── cart/             # cart.model, cart.controller, cart.service, cart.routes
│   │   │   ├── orders/           # order.model, order.controller, order.service, order.routes
│   │   │   └── reviews/          # review.model, review.controller, review.service, review.routes
│   │   └── utils/                # Lớp lỗi chuẩn & hàm phản hồi
│   │       ├── apiError.js
│   │       └── responseHandler.js
│   ├── .env.example
│   └── package.json
│
├── package.json                  # Root Monorepo Scripts
└── README.md
```

---

## 2. Hướng dẫn cài đặt & Khởi chạy

### Cài đặt dependencies:
```bash
# Cài đặt cho frontend
cd frontend
npm install

# Cài đặt cho backend
cd ../backend
npm install
```

### Chạy từ thư mục gốc `AquaCraft`:
```bash
# Chạy Frontend (http://localhost:5173)
npm run dev:frontend

# Chạy Backend (http://localhost:5000)
npm run dev:backend
```
