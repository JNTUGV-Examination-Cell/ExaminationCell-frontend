import axios from 'axios';

export const baseURL = 'http://localhost:9000';
const api = axios.create({
    baseURL: `${baseURL}`,
  });
  
export default api;