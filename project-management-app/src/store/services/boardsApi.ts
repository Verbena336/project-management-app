import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { backendUrl } from 'data/backendUrl';

import {
  getAllBoardsResponse,
  addBoardRequest,
  addUpdateBoardResponse,
  getBoardResponse,
  updateBoardRequest,
} from './types/boards';

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
  tagTypes: ['Boards'],
  endpoints: (build) => ({
    getAllBoards: build.query<getAllBoardsResponse, void>({
      query: () => ({
        url: '/boards',
        method: 'GET',
      }),
      providesTags: ['Boards'],
    }),
    addBoard: build.mutation<addUpdateBoardResponse, addBoardRequest>({
      query: (body) => ({
        url: '/boards',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Boards'],
    }),
    getBoard: build.query<getBoardResponse, string>({
      query: (id: string) => ({ url: `/boards/${id}` }),
      providesTags: ['Boards'],
    }),
    deleteBoard: build.mutation<void, string>({
      query: (id: string) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
    }),
    updateBoard: build.mutation<addUpdateBoardResponse, updateBoardRequest>({
      query: ({ id, body }) => ({
        url: `/boards/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Boards'],
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
