import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { backendUrl } from 'data/backendUrl';

import { usersResponse, userRequest } from './types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
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
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getUsers: build.query<usersResponse, void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
    deleteUser: build.mutation<void, string>({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: build.mutation<void, userRequest>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } = userApi;
