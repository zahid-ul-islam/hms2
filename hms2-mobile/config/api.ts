import axios from 'axios';

export const BASE_URL = 'https://hotel-management-backend-production-2644.up.railway.app/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;






