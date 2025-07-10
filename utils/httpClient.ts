// utils/httpClient.ts
import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // e.g., http://localhost:3000/api
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // if you are using cookies/sessions
});

// Optional: Add interceptors for auth or error handling
httpClient.interceptors.response.use(
  response => response,
  error => {
    console.error('HTTP Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default httpClient;
