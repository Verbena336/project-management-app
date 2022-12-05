import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TColumn } from 'store/services/types/columns';

type LoginSlice = {
  login: string;
  columns: TColumn[];
};

const initialState: LoginSlice = {
  login: localStorage.getItem('KanBanLogin') ?? '',
  columns: [],
};
export const authSlice = createSlice({
  name: 'authForm',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
  },
});

export const { setLogin } = authSlice.actions;

export const loginValue = (state: RootState) => state.auth.login;

export default authSlice.reducer;
