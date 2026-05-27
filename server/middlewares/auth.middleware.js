import jwt from 'jsonwebtoken';
import { findUserById } from '../services/auth.services.js';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user._id.toString() !== decoded.id || user.role !== decoded.role) {
      return res.status(403).json({
        success: false,
        message: 'not permitted',
      });
    }

    req.user = {
      id: user._id,
      role: user.role,
    };
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Token expired or invalid',
    });
  }
};

export default authMiddleware;
