import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { backendUrl } from 'data/backendUrl';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
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
    addTask: build.mutation({
      query: ({ bordId, columnId, ...body }) => ({
        url: `/boards/${bordId}/columns/${columnId}/tasks`,
        method: 'POST',
        body,
      }),
    }),
    getTasks: build.query({
      query: ({ bordId = '', columnId = '' }) => ({
        url: `/boards/${bordId}/columns/${columnId}/tasks`,
        method: 'GET',
      }),
    }),
    getTaskById: build.query({
      query: ({ bordId, columnId, taskId }) => ({
        url: `/boards/${bordId}/columns/${columnId}/tasks/${taskId}`,
        method: 'GET',
      }),
    }),
    deleteTask: build.mutation({
      query: ({ bordId, columnId, taskId }) => ({
        url: `/boards/${bordId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
    }),
    updateTask: build.mutation({
      query: ({ bordId, columnId, taskId, ...body }) => ({
        url: `/boards/${bordId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useAddTaskMutation,
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;
