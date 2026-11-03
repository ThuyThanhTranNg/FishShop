import { sendSuccess } from '../../utils/responseHandler.js';
import * as userService from './user.service.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    sendSuccess(res, users, 'Lấy danh sách người dùng thành công');
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updated = await userService.updateUserProfile(req.user.id, req.body);
    sendSuccess(res, updated, 'Cập nhật thông tin thành công');
  } catch (error) {
    next(error);
  }
};

