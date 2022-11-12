import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendUrl } from 'data/backendUrl';

export const columnsApi = createApi({
  reducerPath: 'columnsApi',
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
    getColumns: build.query({
      query: (boardId) => `/boards/${boardId}/columns`,
    }),
    getColumnById: build.query({
      query: ({ boardId, columnId }) => `/boards/${boardId}/columns/${columnId}`,
    }),
    addColumn: build.mutation({
      query: ({ bordId, ...body }) => ({
        url: `/boards/${bordId}/columns`,
        method: 'POST',
        body,
      }),
    }),
    deleteColumn: build.mutation({
      query: ({ bordId, columnId }) => ({
        url: `/boards/${bordId}/columns/${columnId}`,
        method: 'DELETE',
      }),
    }),
    updateColumn: build.mutation({
      query: ({ bordId, columnId, ...body }) => ({
        url: `/boards/${bordId}/columns/${columnId}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useGetColumnsQuery,
  useGetColumnByIdQuery,
  useAddColumnMutation,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
} = columnsApi;
