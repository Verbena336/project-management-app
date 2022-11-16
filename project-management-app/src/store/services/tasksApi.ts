import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { backendUrl } from 'data/backendUrl';

import {
  tasksParams,
  addTask,
  addTaskResponse,
  getTasksResponse,
  taskByIdRequest,
  getTaskByIdResponse,
  updateTaskRequest,
  updateTaskResponse,
} from './types/tasks';

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
    addTask: build.mutation<addTaskResponse, tasksParams & addTask>({
      query: ({ boardId, columnId, ...body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body,
      }),
    }),
    getTasks: build.query<getTasksResponse, tasksParams>({
      query: ({ boardId = '', columnId = '' }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'GET',
      }),
    }),
    getTaskById: build.query<getTaskByIdResponse, taskByIdRequest>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'GET',
      }),
    }),
    deleteTask: build.mutation<void, taskByIdRequest>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
    }),
    updateTask: build.mutation<updateTaskResponse, taskByIdRequest & updateTaskRequest>({
      query: ({ boardId, columnId, taskId, ...body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
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
