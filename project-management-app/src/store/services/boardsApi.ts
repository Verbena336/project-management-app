// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// import { backendUrl } from 'data/backendUrl';

import { commonApi } from './commonApi';

import {
  GetBoardByIdResponse,
  getAllBoardsResponse,
  addUpdateBoardResponse,
  addBoardRequest,
  updateBoardRequest,
} from './types/boards';

// import {
//   getColumnsResponse,
//   addColumnRequest,
//   TColumn,
//   updateColumnRequest,
//   addColumnResponse,
// } from './types/columns';

// import {
//   addTaskRequest,
//   addTaskResponse,
//   getTasksResponse,
//   getTaskByIdResponse,
//   updateTaskResponse,
//   updateTaskRequest,
// } from './types/tasks';

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

// export const boardsApi = createApi({
//   reducerPath: 'boardsApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: backendUrl,
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem('KanBanToken');
//       if (token) {
//         headers.set('authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ['Boards'],
//   endpoints: (build) => ({
//     getAllBoards: build.query<getAllBoardsResponse, void>({
//       query: () => ({
//         url: '/boards',
//         method: 'GET',
//       }),
//       providesTags: ['Boards'],
//     }),
//     addBoard: build.mutation<addUpdateBoardResponse, addBoardRequest>({
//       query: (body) => ({
//         url: '/boards',
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: ['Boards'],
//     }),
//     getBoard: build.query<GetBoardByIdResponse, string>({
//       query: (id: string) => ({ url: `/boards/${id}` }),
//       providesTags: ['Boards'],
//     }),
//     deleteBoard: build.mutation<void, string>({
//       query: (id: string) => ({
//         url: `/boards/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Boards'],
//     }),
//     updateBoard: build.mutation<addUpdateBoardResponse, updateBoardRequest>({
//       query: ({ id, body }) => ({
//         url: `/boards/${id}`,
//         method: 'PUT',
//         body,
//       }),
//       invalidatesTags: ['Boards'],
//     }),
//     // COLUMNS //////////////////////////////////////////
//     // COLUMNS //////////////////////////////////////////
//     // COLUMNS //////////////////////////////////////////
//     // COLUMNS //////////////////////////////////////////
//     // COLUMNS //////////////////////////////////////////
//     // COLUMNS //////////////////////////////////////////
//     getColumns: build.query<getColumnsResponse, string>({
//       query: (boardId: string) => ({
//         url: `/boards/${boardId}/columns`,
//         method: 'GET',
//       }),
//       providesTags: ['Boards'],
//     }),
//     addColumn: build.mutation<addColumnResponse, addColumnRequest>({
//       query: ({ boardId, body }) => ({
//         url: `/boards/${boardId}/columns`,
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: ['Boards'],
//     }),
//     getColumnById: build.query<TColumn, { boardId: string; columnId: string }>({
//       query: ({ boardId, columnId }) => `/boards/${boardId}/columns/${columnId}`,
//       providesTags: ['Boards'],
//     }),
//     deleteColumn: build.mutation<void, { boardId: string; columnId: string }>({
//       query: ({ boardId, columnId }) => ({
//         url: `/boards/${boardId}/columns/${columnId}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Boards'],
//     }),
//     updateColumn: build.mutation<addColumnResponse, updateColumnRequest>({
//       query: ({ boardId, columnId, body }) => ({
//         url: `/boards/${boardId}/columns/${columnId}`,
//         method: 'PUT',
//         body,
//       }),
//       invalidatesTags: ['Boards'],
//     }),
//     // TASKS //////////////////////////////////////////
//     // TASKS //////////////////////////////////////////
//     // TASKS //////////////////////////////////////////
//     // TASKS //////////////////////////////////////////
//     // TASKS //////////////////////////////////////////
//     // TASKS //////////////////////////////////////////
//     addTask: build.mutation<addTaskResponse, addTaskRequest>({
//       query: ({ boardId, columnId, body }) => ({
//         url: `/boards/${boardId}/columns/${columnId}/tasks`,
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: ['Boards'],
//     }),
//     getTasks: build.query<getTasksResponse, { boardId: string; columnId: string }>({
//       query: ({ boardId, columnId }) => ({
//         url: `/boards/${boardId}/columns/${columnId}/tasks`,
//         method: 'GET',
//       }),
//       providesTags: ['Boards'],
//     }),
//     getTaskById: build.query<
//       getTaskByIdResponse,
//       { boardId: string; columnId: string; taskId: string }
//     >({
//       query: ({ boardId, columnId, taskId }) => ({
//         url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
//         method: 'GET',
//       }),
//       providesTags: ['Boards'],
//     }),
//     deleteTask: build.mutation<void, { boardId: string; columnId: string; taskId: string }>({
//       query: ({ boardId, columnId, taskId }) => ({
//         url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Boards'],
//     }),
//     updateTask: build.mutation<updateTaskResponse, updateTaskRequest>({
//       query: ({ boardId, columnId, taskId, body }) => ({
//         url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
//         method: 'PUT',
//         body,
//       }),
//       invalidatesTags: ['Boards'],
//     }),
//   }),
// });

// export const {
//   useGetAllBoardsQuery,
//   useAddBoardMutation,
//   useGetBoardQuery,
//   useDeleteBoardMutation,
//   useUpdateBoardMutation,
//   useGetColumnsQuery,
//   useGetColumnByIdQuery,
//   useAddColumnMutation,
//   useDeleteColumnMutation,
//   useUpdateColumnMutation,
//   useAddTaskMutation,
//   useGetTasksQuery,
//   useGetTaskByIdQuery,
//   useDeleteTaskMutation,
//   useUpdateTaskMutation,
// } = boardsApi;
