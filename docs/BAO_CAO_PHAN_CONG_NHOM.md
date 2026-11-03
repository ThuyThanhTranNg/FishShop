# BÁO CÁO PHÂN TÍCH KIẾN TRÚC HỆ THỐNG & PHÂN CÔNG NHIỆM VỤ DỰ ÁN AQUACRAFT

**Dự án:** Hệ thống Thương mại Điện tử Thủy sinh & Sinh vật cảnh AquaCraft  
**Khóa học:** DevOps / Kỹ thuật Phần mềm  
**Mô hình kiến trúc:** Feature-Driven Monorepo (Vertical Slice Architecture)  
**Quy mô nhóm:** 4 Thành viên  

---

## 1. TỔNG QUAN DỰ ÁN & BỐI CẢNH TÁI CẤU TRÚC

### 1.1. Hiện trạng trước khi tái cấu trúc
* **Lồng thư mục thừa:** Toàn bộ mã nguồn bị đặt sâu trong thư mục `AquaCraft/FishShop/`, gây cồng kềnh cho đường dẫn, khó viết cấu hình Docker và pipeline CI/CD.
* **Cấu trúc Layer-based truyền thống:** Chia theo tầng kỹ thuật rời rạc (`components`, `controllers`, `services` nằm riêng). Khi phát triển một tính năng như "Sản phẩm", lập trình viên phải nhảy qua lại giữa 5-6 thư mục xa nhau.
* **Nhầm lẫn phân quyền:** `admin` bị coi là một feature độc lập, dẫn đến việc logic của sản phẩm và đơn hàng bị phân mảnh làm đôi (nửa ở feature chính, nửa ở feature admin).

### 1.2. Giải pháp sau khi tái cấu trúc
* Đưa toàn bộ về thư mục gốc chuẩn **Monorepo**: `frontend/` và `backend/`.
* Chuyển đổi sang **Feature-Driven Architecture (Kiến trúc hướng tính năng / Vertical Slice)**: Gom toàn bộ Model, Route, Controller, Service của Backend và Component, Page, Hook, API của Frontend vào đúng tính năng nghiệp vụ đó.

---

## 2. GIẢI THÍCH THUẬT NGỮ KIẾN TRÚC & SƠ ĐỒ CÂY

### 2.1. Tên gọi học thuật
1. **Sơ đồ cây (Project Directory Tree):** Biểu diễn trực quan hệ thống tệp và cấu trúc phân cấp thư mục của toàn bộ kho lưu trữ mã nguồn.
2. **Feature-Driven Architecture / Package by Feature (Kiến trúc hướng tính năng):** Còn được gọi là **Screaming Architecture** (Kiến trúc "nhìn vào là thấy ngay nghiệp vụ"), nơi các tệp mã nguồn được tổ chức theo Domain nghiệp vụ thay vì vai trò kỹ thuật.
3. **Vertical Slice Architecture:** Mỗi tính năng là một lát cắt dọc độc lập, chứa trọn vẹn từ tầng giao diện (UI), tầng nghiệp vụ (Business Logic) đến tầng cơ sở dữ liệu (Data Access).

### 2.2. Sơ đồ cây thư mục chi tiết

```text
AquaCraft/
│
├── frontend/                               # ỨNG DỤNG FRONTEND (React 19, Vite)
│   ├── public/                             # Tài nguyên công khai (favicon, manifest)
│   ├── src/
│   │   ├── app/                            # Khởi tạo & Cấu hình ứng dụng
│   │   │   ├── App.jsx                     # Root React Component
│   │   │   ├── router.jsx                  # Cấu hình định tuyến tập trung
│   │   │   └── providers.jsx               # Khai báo Context/State Providers
│   │   ├── assets/                         # Ảnh, icons, fonts tĩnh
│   │   ├── components/                     # UI tái sử dụng toàn hệ thống
│   │   │   ├── common/                     # Button, Input, Modal, Table...
│   │   │   └── layout/                     # MainLayout, AdminLayout
│   │   ├── features/                       # MODULE TÍNH NĂNG NGHIỆP VỤ
│   │   │   ├── auth/                       # Đăng ký, đăng nhập, quên pass
│   │   │   ├── products/                   # Danh mục, chi tiết cá cảnh, bộ lọc
│   │   │   ├── cart/                       # Giỏ hàng, cập nhật số lượng
│   │   │   ├── orders/                     # Đặt hàng, checkout, lịch sử
│   │   │   ├── reviews/                    # Đánh giá sao, bình luận
│   │   │   └── users/                      # Hồ sơ cá nhân, địa chỉ nhận hàng
│   │   ├── services/                       # Axios Client & Interceptors (api.js)
│   │   └── utils/                          # Format tiền tệ, ngày tháng (formatters.js)
│   ├── package.json
│   └── vite.config.js
│
├── backend/                                # ỨNG DỤNG BACKEND (Express, MongoDB)
│   ├── src/
│   │   ├── server.js                       # Điểm khởi động HTTP Server & DB
│   │   ├── app.js                          # Cấu hình Express app & gắn routes
│   │   ├── configs/                        # Cấu hình DB và biến môi trường
│   │   ├── middlewares/                    # Middleware (JWT Auth, Error, Upload)
│   │   ├── features/                       # CÁC LÁT CẮT DỌC (VERTICAL SLICES)
│   │   │   ├── auth/                       # Controller, Service, Routes
│   │   │   ├── users/                      # Model, Controller, Service, Routes
│   │   │   ├── products/                   # Model, Controller, Service, Routes
│   │   │   ├── cart/                       # Model, Controller, Service, Routes
│   │   │   ├── orders/                     # Model, Controller, Service, Routes
│   │   │   └── reviews/                    # Model, Controller, Service, Routes
│   │   └── utils/                          # Custom ApiError, Response Handler
│   ├── .env.example
│   └── package.json
│
├── docs/                                   # Tài liệu & Báo cáo kỹ thuật
├── package.json                            # Root scripts điều khiển cả 2 phần
└── README.md
```

---

## 3. KẾ HOẠCH PHÂN CHIA NHIỆM VỤ CHO NHÓM 4 NGƯỜI

Áp dụng phương pháp phân chia **Vertical Slice (Fullstack theo tính năng)**: Mỗi thành viên chịu trách nhiệm trọn vẹn cả Frontend và Backend của tính năng mình phụ trách, kèm theo một mảng trách nhiệm về DevOps / Nền tảng kỹ thuật.

### 3.1. Bảng phân công ma trận trách nhiệm

| Thành viên | Tính năng phụ trách | Trách nhiệm Backend | Trách nhiệm Frontend | Trách nhiệm DevOps & Hệ thống |
| :--- | :--- | :--- | :--- | :--- |
| **TV 1** *(Lead)* | **Xác thực & Quản lý Người dùng** | • `features/auth/`<br>• `features/users/`<br>• `auth.middleware.js` (JWT & Phân quyền) | • `features/auth/` (Login, Register)<br>• `features/users/` (Profile)<br>• `MainLayout`, `AdminLayout` | • Khởi tạo Dockerfile (FE & BE)<br>• Cấu hình `docker-compose.yml`<br>• Quản lý nhánh chính Git & Review PR |
| **TV 2** | **Cá cảnh & Danh mục sản phẩm** | • `features/products/`<br>• Tích hợp Multer upload ảnh cá cảnh/thủy sinh<br>• Lọc, tìm kiếm, phân trang | • `features/products/` (Catalog, bộ lọc nước mặn/ngọt, chi tiết cá cảnh)<br>• Trang Admin quản lý sản phẩm | • Cấu hình Volume lưu trữ Media/Ảnh<br>• Tối ưu kích thước bundle ảnh/static assets |
| **TV 3** | **Giỏ hàng & Đơn hàng (Core Business)** | • `features/cart/`<br>• `features/orders/`<br>• Logic trừ kho, tính tổng tiền, trạng thái đơn | • `features/cart/` (Giỏ hàng, tính tạm tính)<br>• `features/orders/` (Checkout, Lịch sử mua hàng, Admin duyệt đơn) | • Viết Unit Test & Integration Test cho luồng thanh toán / tính tiền |
| **TV 4** | **Đánh giá & Thống kê Quản trị** | • `features/reviews/`<br>• API thống kê Dashboard Admin (Doanh thu, số đơn, top bán chạy) | • `features/reviews/` (Rating, bình luận)<br>• Trang `Admin Dashboard` (Thống kê biểu đồ, thẻ tổng quan) | • Xây dựng tài liệu API (Postman / Swagger)<br>• Cấu hình Healthcheck & Logging (Morgan) |

---

## 4. QUY TRÌNH PHỐI HỢP GIT ĐỂ TRÁNH XUNG ĐỘT (GIT WORKFLOW)

### 4.1. Quy tắc phân nhánh (Feature Branching)
* Nhánh `main`: Chỉ chứa mã nguồn ổn định, không ai được push trực tiếp lên `main`.
* Mỗi thành viên tạo nhánh riêng tương ứng với tính năng:
  * TV 1: `git checkout -b feature/auth-users`
  * TV 2: `git checkout -b feature/products-catalog`
  * TV 3: `git checkout -b feature/cart-orders`
  * TV 4: `git checkout -b feature/reviews-dashboard`

### 4.2. Quy ước Commit (Conventional Commits)
* `feat:` Tính năng mới (ví dụ: `feat(products): add filter by water type`)
* `fix:` Sửa lỗi (ví dụ: `fix(cart): resolve total amount calculation bug`)
* `refactor:` Tối ưu mã nguồn nhưng không đổi chức năng
* `docs:` Viết tài liệu báo cáo hoặc hướng dẫn
* `ci:` Cấu hình CI/CD hoặc Docker

### 4.3. Quy trình gộp mã nguồn (Pull Request Checklist)
1. Kéo code mới nhất từ `main` về nhánh cá nhân trước khi mở PR:
   ```bash
   git checkout main
   git pull origin main
   git checkout <ten-nhanh-ca-nhan>
   git merge main
   ```
2. Đẩy nhánh lên GitHub và tạo Pull Request vào `main`.
3. Ít nhất 1 thành viên khác review và phê duyệt (Approve) mới được merge.

---

## 5. LỘ TRÌNH TRIỂN KHAI CHO MÔN HỌC DEVOPS

1. **Giai đoạn 1 (Tính năng cốt lõi):** Các thành viên hoàn thiện các module nghiệp vụ cục bộ (Local).
2. **Giai đoạn 2 (Containerization):** Viết `Dockerfile` nhiều tầng (Multi-stage build) cho FE (Nginx) và BE (Node Alpine), chạy thống nhất qua `docker-compose up`.
3. **Giai đoạn 3 (CI/CD Automation):** Xây dựng GitHub Actions tự động kiểm tra Lint, chạy Test và Build Docker Image khi có PR vào nhánh `main`.
4. **Giai đoạn 4 (Testing & Giám sát):** Kiểm thử tự động, cấu hình giám sát Logs và hoàn tất tài liệu bảo vệ đồ án.
