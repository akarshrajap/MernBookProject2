import axios from 'axios';

// Temporarily hardcoded for testing CORS (replace with your Render backend URL)
const API_BASE_URL = 'https://mern-crud-api.onrender.com';

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