import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loginData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoginData(state, value) {
      state.loginData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    clearAuthData(state) {
      state.signupData = null;
      state.loginData = null;
    },
  },
});

export const { setSignupData, setLoginData, setLoading, setToken, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
