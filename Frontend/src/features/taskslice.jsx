import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../Api/axios";

const API_URL = "/books";

// Helper function to get the Token and setup Headers
const getAuthConfig = (getState) => {
  const token = getState().auth.token || localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// --- ASYNC THUNKS (Named Exports) ---

// 1. Fetch all tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await API.get(API_URL, getAuthConfig(getState));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch tasks");
    }
  }
);

// 2. Add a new task
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const response = await API.post(API_URL, taskData, getAuthConfig(getState));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add task");
    }
  }
);

// 3. Update an existing task (The fix for your SyntaxError)
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updatedData }, { getState, rejectWithValue }) => {
    try {
      const response = await API.put(`${API_URL}/${id}`, updatedData, getAuthConfig(getState));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

// 4. Delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { getState, rejectWithValue }) => {
    try {
      await API.delete(`${API_URL}/${id}`, getAuthConfig(getState));
      return id; // Return ID to remove it from the local state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

// --- SLICE CONFIGURATION ---

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearTaskError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add Task
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update Task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task._id !== action.payload);
      });
  },
});



export const { clearTaskError } = taskSlice.actions;

// Default export for the store
export default taskSlice.reducer;