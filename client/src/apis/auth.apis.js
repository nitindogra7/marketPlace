import api from './Api.js';
export const signup = async (input) => {
  try {
    const res = await api.post('/auth/signup', input);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};
