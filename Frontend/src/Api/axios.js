import axios from 'axios';

// Use environment variable, fallback to deployed backend, then localhost
// Priority: VITE_API_URL env var > deployed backend > localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://mernbookproject2-1.onrender.com' || 'http://localhost:4000';

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