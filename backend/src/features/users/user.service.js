import User from './user.model.js';
import { ApiError } from '../../utils/apiError.js';

export const getAllUsers = async () => {
  return await User.find().select('-password');
};

export const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new ApiError(404, 'Không tìm thấy người dùng');
  return user;
};

export const updateUserProfile = async (id, updateData) => {
  delete updateData.password;
  delete updateData.role;
  const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
  if (!user) throw new ApiError(404, 'Không tìm thấy người dùng');
  return user;
};
