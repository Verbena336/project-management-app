import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { backendUrl } from 'data/backendUrl';

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
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
  endpoints: (build) => ({
    getAllBoards: build.query({
      query: () => '/boards',
    }),
    addBoard: build.mutation({
      query: (body) => ({
        url: '/boards',
        method: 'POST',
        body,
      }),
    }),
    getBoard: build.query({
      query: (id) => ({ url: `/boards/${id}` }),
    }),
    deleteBoard: build.mutation({
      query: (id) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
    }),
    updateBoard: build.mutation({
      query: ({ id, body }) => ({
        url: `/boards/${id}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useGetAllBoardsQuery,
  useAddBoardMutation,
  useGetBoardQuery,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} = boardsApi;
