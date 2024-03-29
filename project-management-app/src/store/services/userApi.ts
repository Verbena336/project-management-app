import { commonApi } from './commonApi';

import { usersResponse, userRequest, userResponse } from './types/user';

export const userApi = commonApi.injectEndpoints({
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
    getUserById: build.query<userResponse, string>({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
} = userApi;
