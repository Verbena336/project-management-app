import { commonApi } from './commonApi';

import { signInRequest, signInResponse, signUpRequest, signUpResponse } from './types/auth';

export const authApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<signUpResponse, signUpRequest>({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),
    signin: build.mutation<signInResponse, signInRequest>({
      query: (body) => ({
        url: '/signin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation } = authApi;
