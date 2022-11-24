import { commonApi } from './commonApi';

import {
  GetBoardByIdResponse,
  getAllBoardsResponse,
  addUpdateBoardResponse,
  addBoardRequest,
  updateBoardRequest,
} from './types/boards';

export const boardsApi = commonApi.injectEndpoints({
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
    getBoard: build.query<GetBoardByIdResponse, string>({
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
