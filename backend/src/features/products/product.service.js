import Product from './product.model.js';
import { ApiError } from '../../utils/apiError.js';

export const getAllProducts = async (filters = {}) => {
  const query = { isActive: true };
  if (filters.category) query.category = filters.category;
  if (filters.waterType) query.waterType = filters.waterType;
  return await Product.find(query).sort({ createdAt: -1 });
};

export const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, 'Không tìm thấy sản phẩm');
  return product;
};

export const createProduct = async (productData) => {
  return await Product.create(productData);
};

export const updateProduct = async (id, updateData) => {
  const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
  if (!product) throw new ApiError(404, 'Không tìm thấy sản phẩm');
  return product;
};

export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
  if (!product) throw new ApiError(404, 'Không tìm thấy sản phẩm');
  return product;
};
