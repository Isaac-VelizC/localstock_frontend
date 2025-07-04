import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialState } from './types';
import type { LoginUserData, RegisterUserData } from '@/interfaces/Auth';
import {
  completedDataAccount,
  fetchCurrentUser,
  loginUser,
  registerUser,
  verificationCodeAPI,
} from './authAPI';
import { getErrorMessage } from '@/utils/errorUtils';
import type { UserCompletedOnboardingInterface } from '@/interfaces/Account';

interface ApiResponse<T> {
  data: T;
}

function handleSuccess<T>(
  response: ApiResponse<T>,
  tokenKey?: keyof T,
): T | string | undefined {
  if (tokenKey && response.data && response.data[tokenKey]) {
    const token = response.data[tokenKey];
    localStorage.setItem('authToken', String(token));
    return String(token);
  }
  return response.data;
}
function handleTokenResponse(data: any) {
  if (data.access && data.refresh) {
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    return data;
  }
  return null;
}

export const login = createAsyncThunk(
  'user/login',
  async (credentials: LoginUserData, { rejectWithValue }) => {
    try {
      const res = await loginUser(credentials); // POST a /api/token/
      const tokenData = handleTokenResponse(res.data);
      return tokenData;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const sendVerificationCode = createAsyncThunk(
  'user/sendVerificationCode',
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await verificationCodeAPI(email);
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (data: RegisterUserData, { rejectWithValue }) => {
    try {
      const res = await registerUser(data);
      const tokenData = handleTokenResponse(res.data);
      return tokenData;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);
// AsyncThunk con Axios
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchCurrentUser();
      return handleSuccess(res);
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// AsyncThunk con Axios
export const completedDataAccountStore = createAsyncThunk(
  'user/completedDataAccountStore',
  async (data: UserCompletedOnboardingInterface, { rejectWithValue }) => {
    try {
      const res = await completedDataAccount(data);
      return res.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const logout = createAsyncThunk('user/logout', async () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  // También puedes llamar al backend si tienes un logout endpoint
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading.login = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading.login = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loading.login = false;
        state.error = (action.payload as string) || 'Error al iniciar sesión';
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading.fetch = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading.fetch = false;
        state.error = null;
        state.initialized = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        state.user = null;
        state.isAuthenticated = false;
        state.loading.fetch = false;
        state.initialized = true;
      })
      .addCase('auth/fetchUser/skip', (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading.fetch = false;
        state.initialized = true;
      })
      .addCase(sendVerificationCode.pending, (state) => {
        state.loading.register = true;
        state.error = null;
      })
      .addCase(sendVerificationCode.fulfilled, (state) => {
        state.loading.register = false;
      })
      .addCase(sendVerificationCode.rejected, (state) => {
        state.loading.register = false;
      })
      .addCase(register.pending, (state) => {
        state.loading.register = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading.register = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading.register = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(completedDataAccountStore.pending, (state) => {
        state.loading.completed = true;
        state.error = null;
      })
      .addCase(completedDataAccountStore.fulfilled, (state) => {
        state.loading.completed = false;
        state.error = null;
      })
      .addCase(completedDataAccountStore.rejected, (state, action) => {
        state.loading.completed = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
