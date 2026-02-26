import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/taskslice';
import authReducer from '../features/authSlice'; // 1. Import it

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer, // 2. The key 'auth' must match what you call in App.jsx
  },
});