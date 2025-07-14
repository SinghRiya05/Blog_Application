// middlewares/role.middleware.js
import { ApiError } from '../utils/ApiError.js';

export const isAdmin = (req, res, next) => {
  
  if (req.user?.role !== 'admin') {
    throw new ApiError(403, 'Access Denied - Admins only');
  }
  next();
};
