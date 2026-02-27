import axios from 'axios';

// Use environment variable only. Set VITE_API_URL to your backend host in deployment settings.
const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  console.warn('VITE_API_URL not defined; frontend requests may fail.');
}

// Create an instance so you don't pollute the global axios object
const API = axios.create({
    baseURL: `${API_BASE_URL}/api`,
});


// Add the interceptor to THIS instance
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;