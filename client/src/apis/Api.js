import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const req = error.config;

    if (error.response?.status === 401 && !req._retry) {
      req._retry = true;

      try {
        const res = await axios.post(
          'http://localhost:5000/auth/refresh-token',
          {},
          { withCredentials: true }
        );
        const token = res.data.accessToken;

        localStorage.setItem('accessToken', token);
        req.headers.Authorization = `Bearer ${token}`;
        return api(req);
      } catch (err) {
        localStorage.removeItem('accessToken');
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
