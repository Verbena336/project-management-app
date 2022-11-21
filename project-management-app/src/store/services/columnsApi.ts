import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { backendUrl } from 'data/backendUrl';

import {
  getColumnsResponse,
  columnRequest,
  getColumnByIdResponse,
  addColumnRequest,
  updateColumnRequest,
  addUpdateColumnResponse,
} from './types/columns';

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
  tagTypes: ['Columns'],
  endpoints: (build) => ({
    getColumns: build.query<getColumnsResponse, string>({
      query: (boardId: string) => ({
        url: `/boards/${boardId}/columns`,
        method: 'GET',
      }),
      providesTags: ['Columns'],
    }),
    addColumn: build.mutation<addUpdateColumnResponse, addColumnRequest>({
      query: ({ boardId, body }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Columns'],
    }),
    getColumnById: build.query<getColumnByIdResponse, columnRequest>({
      query: ({ boardId, columnId }) => `/boards/${boardId}/columns/${columnId}`,
      providesTags: ['Columns'],
    }),
    deleteColumn: build.mutation<void, columnRequest>({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Columns'],
    }),
    updateColumn: build.mutation<addUpdateColumnResponse, updateColumnRequest>({
      query: ({ boardId, columnId, ...body }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Columns'],
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
