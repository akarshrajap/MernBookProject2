import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

// 1. ASYNC THUNK: Login User
// We use 'export' so Login.jsx can import { loginUser }
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      
      // Save token to localStorage so the user stays logged in after refresh
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      
      return response.data; // Usually returns { token, user }
    } catch (err) {
      // Passes the backend error message (e.g., "Invalid credentials") to Redux
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// 2. ASYNC THUNK: Register User (Optional but recommended)
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Action to clear state and storage on logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
    },
    // Clear error when the user starts typing again
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // LOGIN CASES
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Sets the error from rejectWithValue
      })
      
      // REGISTER CASES
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});



// Exporting actions for use in components
export const { logout, clearAuthError } = authSlice.actions;

// Exporting the reducer as DEFAULT for the store
export default authSlice.reducer;