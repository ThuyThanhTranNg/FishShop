# BÁO CÁO PHÂN CHIA CÔNG VIỆC CHI TIẾT (FRONTEND & BACKEND)
## DỰ ÁN THƯƠNG MẠI ĐIỆN TỬ AQUACRAFT

* **Môn học:** DevOps / Kỹ thuật Phần mềm
* **Mô hình triển khai:** Feature-Driven Monorepo (Vertical Slice Architecture)
* **Quy mô:** Nhóm 4 Thành viên

---

## 1. NGUYÊN TẮC PHÂN CHIA (VERTICAL SLICE FULLSTACK)
Mỗi thành viên trong nhóm 4 người sẽ đảm nhận **trọn gói một lát cắt dọc (Vertical Slice)** bao gồm cả:
1. **Phần Backend (BE):** Database Model, Business Logic (Service), API Endpoints (Controller, Routes), Middlewares bảo vệ.
2. **Phần Frontend (FE):** Giao diện (Pages, Components), Gọi API (Services), Quản lý State/Hooks, Kiểm tra dữ liệu (Validation).

> [!TIP]
> **Ưu điểm vượt trội:**
> * Không ai phải chờ đợi nhau (FE tự làm API và tự kết nối ngay lập tức).
> * Giảm triệt để 100% nguy cơ xung đột mã nguồn (Merge Conflict) vì mỗi người thao tác trên một thư mục `features/<tên_tính_năng>/` riêng biệt ở cả 2 đầu FE & BE.

---

## 2. BẢNG TỔNG HỢP MA TRẬN PHÂN CÔNG 4 THÀNH VIÊN

| Thành viên | Tính năng phụ trách | Khối lượng Frontend (FE) | Khối lượng Backend (BE) | Trách nhiệm DevOps & Hệ thống |
| :--- | :--- | :--- | :--- | :--- |
| **TV 1** *(Lead)* | **Xác thực & Người dùng** (`auth`, `users`) | • Trang Login, Register<br>• Trang Profile cá nhân<br>• Bảng quản trị User (Admin)<br>• Header Layout & AuthContext | • User Model & bcrypt hash<br>• JWT Token & Auth Middleware<br>• API Login, Register, Profile<br>• Phân quyền Admin | • Dockerfile cho FE & BE<br>• docker-compose.yml<br>• Quản trị Git & Review PR |
| **TV 2** | **Cá cảnh & Danh mục** (`products`) | • Danh sách cá cảnh & bộ lọc nước ngọt/mặn<br>• Trang chi tiết cá cảnh & thông số pH<br>• Trang Admin CRUD sản phẩm & upload ảnh | • Product Model<br>• Multer upload hình ảnh cá<br>• API tìm kiếm, phân trang, lọc giá<br>• API thêm, sửa, xóa sản phẩm | • Cấu hình Volume lưu ảnh<br>• Tối ưu kích thước bundle ảnh/static |
| **TV 3** | **Giỏ hàng & Đơn hàng** (`cart`, `orders`) | • Giỏ hàng & cập nhật số lượng<br>• Trang Checkout & chọn thanh toán<br>• Lịch sử đơn hàng của khách<br>• Admin duyệt & đổi trạng thái đơn | • Cart Model & Order Model<br>• API CRUD giỏ hàng<br>• API Đặt hàng, trừ tồn kho<br>• API đổi trạng thái đơn hàng | • Viết Unit Test & Integration Test cho luồng tính tiền / đặt hàng |
| **TV 4** | **Đánh giá & Thống kê** (`reviews`, `dashboard`) | • Đánh giá sao (1-5★) & form bình luận<br>• Danh sách review dưới chi tiết sản phẩm<br>• Trang Admin Dashboard (Cards & Biểu đồ) | • Review Model<br>• API đánh giá có kiểm tra đã mua hàng<br>• API thống kê tổng doanh thu, số đơn, top bán chạy | • Viết tài liệu API (Postman / Swagger)<br>• Cấu hình Healthcheck & Logging (Morgan) |

---

## 3. ĐẶC TẢ CHI TIẾT TỪNG FILE & NHIỆM VỤ CỦA TỪNG BẠN

### 👤 THÀNH VIÊN 1: AUTHENTICATION & USER MANAGEMENT (XÁC THỰC & TÀI KHOẢN)

#### 🔹 Phần Backend (BE):
* **Model:** `backend/src/features/users/user.model.js`
  * Thuộc tính: `name`, `email` (unique, lowercase), `password` (băm bằng `bcryptjs`), `role` ('user' | 'admin'), `phone`, `address`.
* **Middlewares:** `backend/src/middlewares/auth.middleware.js`
  * `verifyToken`: Giải mã Bearer JWT token từ header `Authorization`, gán vào `req.user`.
  * `verifyAdmin`: Kiểm tra `req.user.role === 'admin'`.
* **Logic & Routes:** `backend/src/features/auth/` & `backend/src/features/users/`
  * `POST /api/auth/register`: Nhận `{ name, email, password }` ➔ Kiểm tra trùng email ➔ Hash pass ➔ Trả về user và JWT.
  * `POST /api/auth/login`: Nhận `{ email, password }` ➔ Kiểm tra mật khẩu ➔ Trả về JWT token.
  * `GET /api/auth/me`: Lấy thông tin user hiện tại qua token.
  * `GET /api/users/profile`: Lấy thông tin chi tiết user đăng nhập.
  * `PUT /api/users/profile`: Cập nhật `{ name, phone, address }`.
  * `GET /api/users`: (Chỉ Admin) Lấy danh sách toàn bộ người dùng.

#### 🔹 Phần Frontend (FE):
* **Services & Context:**
  * `frontend/src/features/auth/services/authApi.js`: Gọi API `login`, `register`, `getMe`.
  * `frontend/src/features/users/services/userApi.js`: Gọi API `getProfile`, `updateProfile`.
  * `frontend/src/features/auth/hooks/useAuth.js`: Quản lý state token, user, isAuthenticated, login, logout.
* **Giao diện Pages & Components:**
  * `frontend/src/features/auth/pages/LoginPage.jsx`: Form đăng nhập, validate email, hiện lỗi nếu sai mật khẩu.
  * `frontend/src/features/auth/pages/RegisterPage.jsx`: Form đăng ký có kiểm tra xác nhận lại mật khẩu.
  * `frontend/src/features/users/pages/ProfilePage.jsx`: Xem & sửa thông tin cá nhân, địa chỉ nhận hàng.
  * `frontend/src/features/users/pages/AdminUserManagePage.jsx`: Bảng người dùng cho Admin.
  * `frontend/src/components/layout/MainLayout.jsx`: Hiển thị tên/avatar khi đăng nhập, nút Đăng xuất.

---

### 🐟 THÀNH VIÊN 2: PRODUCTS & CATALOG MANAGEMENT (SẢN PHẨM & CÁ CẢNH)

#### 🔹 Phần Backend (BE):
* **Model:** `backend/src/features/products/product.model.js`
  * Thuộc tính: `name`, `description`, `price`, `category` ('fish', 'plant', 'accessory', 'tank', 'food'), `stock`, `images` (array string), `origin`, `waterType` ('freshwater', 'saltwater'), `isActive` (boolean).
* **Middlewares:** `backend/src/middlewares/upload.middleware.js`
  * Cấu hình Multer nhận file upload ảnh từ multipart/form-data.
* **Logic & Routes:** `backend/src/features/products/`
  * `GET /api/products`: Lấy danh sách cá cảnh. Hỗ trợ query: `?category=&waterType=&search=&minPrice=&maxPrice=&page=&limit=`.
  * `GET /api/products/:id`: Lấy chi tiết 1 con cá/sản phẩm.
  * `POST /api/products`: (Admin) Thêm sản phẩm mới kèm tải ảnh lên.
  * `PUT /api/products/:id`: (Admin) Cập nhật giá, số lượng tồn kho.
  * `DELETE /api/products/:id`: (Admin) Xóa mềm sản phẩm (`isActive = false`).

#### 🔹 Phần Frontend (FE):
* **Services & Hooks:**
  * `frontend/src/features/products/services/productApi.js`: Gọi API lấy danh sách, chi tiết, CRUD sản phẩm.
  * `frontend/src/features/products/hooks/useProducts.js`: Quản lý query params (page, filter, search), loading state.
* **Giao diện Pages & Components:**
  * `frontend/src/features/products/components/ProductCard.jsx`: Thẻ hiển thị cá cảnh (ảnh, tên, tag nước ngọt/mặn, giá VND, nút mua).
  * `frontend/src/features/products/components/ProductFilter.jsx`: Bộ lọc theo loài cá, môi trường nước ngọt/mặn, khoảng giá.
  * `frontend/src/features/products/pages/ProductListPage.jsx`: Grid danh sách sản phẩm, thanh tìm kiếm (search bar) và phân trang.
  * `frontend/src/features/products/pages/ProductDetailPage.jsx`: Xem ảnh lớn, thông số độ pH/nhiệt độ, chọn số lượng mua, nút "Thêm vào giỏ".
  * `frontend/src/features/products/pages/AdminProductManagePage.jsx`: Bảng quản lý sản phẩm cho Admin, modal form thêm cá mới/upload ảnh.

---

### 🛒 THÀNH VIÊN 3: CART & ORDER PROCESSING (GIỎ HÀNG & ĐƠN HÀNG)

#### 🔹 Phần Backend (BE):
* **Model:** 
  * `backend/src/features/cart/cart.model.js`: `user`, `items: [{ product (ref), quantity }]`.
  * `backend/src/features/orders/order.model.js`: `user`, `items: [{ product, name, price, quantity }]`, `totalAmount`, `shippingAddress`, `phoneNumber`, `paymentMethod` ('cod' | 'banking'), `status` ('pending', 'confirmed', 'shipping', 'delivered', 'cancelled').
* **Logic & Routes:** `backend/src/features/cart/` & `backend/src/features/orders/`
  * `GET /api/cart`: Lấy giỏ hàng của user đang đăng nhập (populate chi tiết cá).
  * `POST /api/cart/add`: Thêm vào giỏ hoặc tăng số lượng `{ productId, quantity }`.
  * `DELETE /api/cart/:productId`: Xóa 1 sản phẩm khỏi giỏ hàng.
  * `POST /api/orders`: Tạo đơn hàng từ giỏ hàng (Kiểm tra `stock` trong kho, tính `totalAmount`, trừ số lượng tồn kho của cá, xóa sạch giỏ hàng).
  * `GET /api/orders/my-orders`: Xem danh sách đơn hàng đã mua của user.
  * `GET /api/orders/admin`: (Admin) Xem toàn bộ đơn hàng trong hệ thống.
  * `PATCH /api/orders/:id/status`: (Admin) Cập nhật trạng thái đơn hàng (`pending` ➔ `shipping` ➔ `delivered` hoặc `cancelled`).

#### 🔹 Phần Frontend (FE):
* **Services & Hooks:**
  * `frontend/src/features/cart/services/cartApi.js`: Gọi API lấy giỏ, thêm vào giỏ, xóa khỏi giỏ.
  * `frontend/src/features/orders/services/orderApi.js`: Gọi API tạo đơn, lịch sử đơn, đổi trạng thái.
  * `frontend/src/features/cart/hooks/useCart.js`: Quản lý state giỏ hàng, số lượng badge hiển thị trên Header.
* **Giao diện Pages & Components:**
  * `frontend/src/features/cart/pages/CartPage.jsx`: Bảng giỏ hàng, nút tăng giảm [+] [-], tính tạm tính, nút "Tiến hành đặt hàng".
  * `frontend/src/features/orders/pages/CheckoutPage.jsx`: Form nhập địa chỉ nhận hàng, số điện thoại, chọn thanh toán COD/Chuyển khoản, nút "Xác nhận đặt hàng".
  * `frontend/src/features/orders/pages/OrderHistoryPage.jsx`: Danh sách đơn hàng đã đặt của khách, gắn tag màu theo trạng thái.
  * `frontend/src/features/orders/pages/AdminOrderManagePage.jsx`: Bảng đơn hàng cho Admin, dropdown chuyển trạng thái đơn.

---

### ⭐ THÀNH VIÊN 4: REVIEWS & ADMIN DASHBOARD (ĐÁNH GIÁ & BÁO CÁO THỐNG KÊ)

#### 🔹 Phần Backend (BE):
* **Model:** `backend/src/features/reviews/review.model.js`
  * Thuộc tính: `product` (ref), `user` (ref), `rating` (1-5 sao), `comment` (string).
* **Logic & Routes:** `backend/src/features/reviews/`
  * `GET /api/reviews/product/:productId`: Lấy toàn bộ đánh giá của 1 sản phẩm (populate tên người đánh giá).
  * `POST /api/reviews/product/:productId`: Gửi đánh giá sao và bình luận (Yêu cầu đăng nhập; kiểm tra nếu đã mua hàng mới cho đánh giá).
  * `GET /api/admin/dashboard/stats`: Thống kê tổng hợp cho Admin (Tổng doanh thu VNĐ, tổng số đơn hàng, tổng số cá cảnh, tổng số khách hàng).
  * `GET /api/admin/dashboard/recent-orders`: Lấy 5 đơn hàng mới nhất cần xử lý.
  * `GET /api/admin/dashboard/top-products`: Top 5 sản phẩm bán chạy nhất.

#### 🔹 Phần Frontend (FE):
* **Services & Hooks:**
  * `frontend/src/features/reviews/services/reviewApi.js`: Gọi API lấy đánh giá, gửi đánh giá.
  * `frontend/src/features/admin/services/dashboardApi.js`: Gọi API lấy số liệu thống kê Dashboard.
  * `frontend/src/features/reviews/hooks/useReviews.js`: Quản lý danh sách đánh giá của sản phẩm.
* **Giao diện Pages & Components:**
  * `frontend/src/features/reviews/components/StarRating.jsx`: Component hiển thị và chọn số sao (1-5 sao vàng).
  * `frontend/src/features/reviews/components/ReviewList.jsx`: Danh sách bình luận khách hàng (tên, số sao, nội dung, ngày đăng).
  * `frontend/src/features/reviews/components/ReviewForm.jsx`: Ô nhập nhận xét và chọn sao đặt ngay dưới trang chi tiết cá cảnh.
  * `frontend/src/features/admin/pages/AdminDashboardPage.jsx`: Màn hình Admin Dashboard với 4 thẻ tổng quan (Doanh thu, Đơn hàng, Sản phẩm, Khách hàng), bảng 5 đơn mới nhất và danh sách bán chạy.

---

## 4. QUY TRÌNH PHỐI HỢP GIT WORKFLOW
1. **Mỗi người 1 nhánh riêng:**
   * TV 1: `git checkout -b feature/auth-users`
   * TV 2: `git checkout -b feature/products-catalog`
   * TV 3: `git checkout -b feature/cart-orders`
   * TV 4: `git checkout -b feature/reviews-dashboard`
2. **Quy tắc thao tác:** Chỉ code trong thư mục feature của mình ở cả FE và BE.
3. **Pull Request (PR):** Kéo code mới nhất từ `main` về nhánh mình (`git merge main`), test chạy thử ổn định rồi mới mở PR để cả nhóm duyệt.
