import axios from 'axios';

// Create an instance so you don't pollute the global axios object
const API = axios.create({
    baseURL: 'http://localhost:4000/api', // or your Render URL
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