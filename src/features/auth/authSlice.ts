import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: any | null;
  role: string | null;
  type: string | null;
  instituteType: string | null;
  isAuthenticated: boolean;
  isValidating: boolean;
  validationError: string | null;
}

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('authToken') : null,
  refreshToken: typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null,
  user: (() => {
    if (typeof window === 'undefined') return null;
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error('Failed to parse authUser from localStorage:', e);
        return null;
      }
    }
    return null;
  })(),
  role: typeof window !== 'undefined' ? localStorage.getItem('authRole') : null,
  type: typeof window !== 'undefined' ? localStorage.getItem('authType') : null,
  instituteType: typeof window !== 'undefined' ? localStorage.getItem('authInstituteType') : null,
  isAuthenticated: typeof window !== 'undefined' ? localStorage.getItem('authIsAuthenticated') === 'true' : false,
  isValidating: false,
  validationError: null,
};

// If role, type, or instituteType are not in localStorage but user exists, derive them from user
if (typeof window !== 'undefined' && initialState.user) {
  if (!initialState.role) {
    const derivedRole = initialState.user?.role || null;
    initialState.role = derivedRole;
    if (derivedRole) localStorage.setItem('authRole', derivedRole);
  }
  if (!initialState.type) {
    const derivedType = initialState.user?.type || null;
    initialState.type = derivedType;
    if (derivedType) localStorage.setItem('authType', derivedType);
  }
  if (!initialState.instituteType) {
    const derivedInstituteType = initialState.user?.instituteType || null;
    initialState.instituteType = derivedInstituteType;
    if (derivedInstituteType) localStorage.setItem('authInstituteType', derivedInstituteType);
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken: string;
        user: any;
      }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.role = action.payload.user?.role || state.role || null;
      state.type = action.payload.user?.type || state.type || null;
      state.instituteType = action.payload.user?.instituteType || state.instituteType || null;
      state.isAuthenticated = true;
      state.isValidating = false;
      state.validationError = null;

      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', action.payload.token);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
        localStorage.setItem('authRole', state.role || '');
        localStorage.setItem('authType', state.type || '');
        localStorage.setItem('authInstituteType', state.instituteType || '');
        localStorage.setItem('authIsAuthenticated', 'true');
      }
    },
    updateUserProfile: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.role = action.payload?.role || state.role || null;
      state.type = action.payload?.type || state.type || null;
      state.instituteType = action.payload?.instituteType || state.instituteType || null;

      if (typeof window !== 'undefined') {
        localStorage.setItem('authUser', JSON.stringify(action.payload));
        localStorage.setItem('authRole', state.role || '');
        localStorage.setItem('authType', state.type || '');
        localStorage.setItem('authInstituteType', state.instituteType || '');
      }
    },
    validateCredentialsStart: (state) => {
      state.isValidating = true;
      state.validationError = null;
    },
    validateCredentialsSuccess: (
      state,
      action: PayloadAction<{ user: any }>
    ) => {
      state.user = action.payload.user;
      state.role = action.payload.user?.role || state.role || null;
      state.type = action.payload.user?.type || state.type || null;
      state.instituteType = action.payload.user?.instituteType || state.instituteType || null;
      state.isAuthenticated = true;
      state.isValidating = false;

      if (typeof window !== 'undefined') {
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
        localStorage.setItem('authRole', state.role || '');
        localStorage.setItem('authType', state.type || '');
        localStorage.setItem('authInstituteType', state.instituteType || '');
        localStorage.setItem('authIsAuthenticated', 'true');
      }
    },
    validateCredentialsFailure: (state, action: PayloadAction<string>) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.role = null;
      state.type = null;
      state.instituteType = null;
      state.isAuthenticated = false;
      state.isValidating = false;
      state.validationError = action.payload;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('authUser');
        localStorage.removeItem('authRole');
        localStorage.removeItem('authType');
        localStorage.removeItem('authInstituteType');
        localStorage.removeItem('authIsAuthenticated');
      }
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.role = null;
      state.type = null;
      state.instituteType = null;
      state.isAuthenticated = false;
      state.isValidating = false;
      state.validationError = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('authUser');
        localStorage.removeItem('authRole');
        localStorage.removeItem('authType');
        localStorage.removeItem('authInstituteType');
        localStorage.removeItem('authIsAuthenticated');
        localStorage.removeItem("logged_in")
        localStorage.removeItem("onboarding_skipped")
        localStorage.removeItem("payment_successfull")
        localStorage.removeItem("institute-register-address")
        localStorage.removeItem("institute-register")
        localStorage.removeItem("selected_type")
      }
    },
  },
});

export const {
  setCredentials,
  updateUserProfile,
  validateCredentialsStart,
  validateCredentialsSuccess,
  validateCredentialsFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;