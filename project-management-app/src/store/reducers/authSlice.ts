import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type AuthForm = {
  signUpForm: SignUpFields;
  signInForm: SignInFields;
};

type SignUpFields = {
  name?: string;
  login?: string;
  password?: string;
};

type SignInFields = {
  login?: string;
  password?: string;
};

const initialState: AuthForm = {
  signUpForm: {
    name: '',
    login: '',
    password: '',
  },
  signInForm: {
    login: '',
    password: '',
  },
};
export const authSlice = createSlice({
  name: 'authForm',
  initialState,
  reducers: {
    setSignupValues: (state, action: PayloadAction<SignUpFields>) => {
      state.signUpForm = action.payload;
    },
    setSigninValues: (state, action: PayloadAction<SignInFields>) => {
      state.signInForm = action.payload;
    },
  },
});

export const { setSignupValues, setSigninValues } = authSlice.actions;

export const signupValues = (state: RootState) => state.auth.signUpForm;
export const signinValues = (state: RootState) => state.auth.signInForm;

export default authSlice.reducer;
