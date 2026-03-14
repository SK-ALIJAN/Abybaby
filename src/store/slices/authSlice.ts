import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../../services/modules/auth.service';
import { storageService } from '../../services/storage/storage.service';
import { PersistenceStorageKey } from '../../services/storage/PersistenceStorageKey';
import type { AuthState, User } from '../../types/auth.types';



/* ================================
   INITIAL STATE
================================ */

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/* ================================
   ASYNC THUNKS
================================ */

// 🔹 Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(payload);

      // Save tokens
      storageService.set(
        'local',
        PersistenceStorageKey.TOKEN,
        response.accessToken
      );

      storageService.set(
        'local',
        PersistenceStorageKey.REFRESH_TOKEN,
        response.refreshToken
      );

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// 🔹 Register
export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    payload: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.register(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

// 🔹 Get Profile (optional)
export const fetchProfile = createAsyncThunk(
  'auth/profile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getProfile();
      return response;
    } catch (error: any) {
      return rejectWithValue('Failed to fetch profile');
    }
  }
);

/* ================================
   SLICE
================================ */

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;

      storageService.clear('local');
    },

    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------------- LOGIN ---------------- */

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /* ---------------- REGISTER ---------------- */

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /* ---------------- PROFILE ---------------- */

      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
