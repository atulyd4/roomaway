/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  refreshToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.access;
      state.user = action.payload.user;
      state.refreshToken = action.payload.refreshToken;
    },

    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      localStorage.clear();
    },

    updateUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
