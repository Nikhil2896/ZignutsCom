import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    login: false,
    email: '',
  },
  reducers: {
    onLogin: (state, action) => {
      const { login, email } = action.payload;
      state.login = login;
      state.email = email;
    },
  },
});

export const { onLogin } = loginSlice.actions;
export default loginSliceReducer = loginSlice.reducer;
