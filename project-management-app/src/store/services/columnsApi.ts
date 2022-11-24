import { commonApi } from './commonApi';

import {
  TColumn,
  getColumnsResponse,
  addColumnRequest,
  updateColumnRequest,
  addColumnResponse,
} from './types/columns';

export const columnsApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getColumns: build.query<getColumnsResponse, string>({
      query: (boardId: string) => ({
        url: `/boards/${boardId}/columns`,
        method: 'GET',
      }),
      providesTags: ['Boards'],
    }),
    addColumn: build.mutation<addColumnResponse, addColumnRequest>({
      query: ({ boardId, body }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Boards'],
    }),
    getColumnById: build.query<TColumn, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => `/boards/${boardId}/columns/${columnId}`,
      providesTags: ['Boards'],
    }),
    deleteColumn: build.mutation<void, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
    }),
    updateColumn: build.mutation<addColumnResponse, updateColumnRequest>({
      query: ({ boardId, columnId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Boards'],
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
