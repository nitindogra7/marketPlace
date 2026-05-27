import User from '../models/user.model.js';
import { findUserById } from '../services/auth.services.js';
export const getWorkspace = async (req, res) => {
  try {
    const id = req.user.id;
    const userdata = await findUserById(id);
    res.status(200).json({
      sucess: true,
      user: {
        username: userdata.username,
        role: userdata.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
