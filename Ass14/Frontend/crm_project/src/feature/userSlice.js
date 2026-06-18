import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  token:null,
  role:null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {

      const { user, token } = action.payload;
      state.loading = false;
      state.isLoggedIn = true;
      state.currentUser = user;
      state.role = user.role;
      state.token = token;

    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.role = null;
      state.token = null;
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;