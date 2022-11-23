import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TColumn } from 'store/services/types/boards';

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
    setColumns: (state, action: PayloadAction<TColumn[]>) => {
      state.columns = action.payload;
    },
  },
});

export const { setLogin, setColumns } = authSlice.actions;

export const loginValue = (state: RootState) => state.auth.login;
export const columnsValue = (state: RootState) => state.auth.columns;

export default authSlice.reducer;
