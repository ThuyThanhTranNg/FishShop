import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ENV } from './configs/env.config.js';
import { errorHandler } from './middlewares/error.middleware.js';

// Feature Routes
import authRoutes from './features/auth/auth.routes.js';
import userRoutes from './features/users/user.routes.js';
import productRoutes from './features/products/product.routes.js';
import cartRoutes from './features/cart/cart.routes.js';
import orderRoutes from './features/orders/order.routes.js';
import reviewRoutes from './features/reviews/review.routes.js';

const app = express();

// Middlewares
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (ENV.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'AquaCraft API is running smoothly' });
});

// Feature Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;

