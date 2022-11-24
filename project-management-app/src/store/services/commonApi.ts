import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { backendUrl } from 'data/backendUrl';

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('KanBanToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Boards', 'Users'],
  endpoints: () => ({}),
});
