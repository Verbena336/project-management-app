import { commonApi } from './commonApi';

import {
  addTaskRequest,
  addTaskResponse,
  getTasksResponse,
  getTaskByIdResponse,
  updateTaskRequest,
  updateTaskResponse,
} from './types/tasks';

export const tasksApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    addTask: build.mutation<addTaskResponse, addTaskRequest>({
      query: ({ boardId, columnId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Boards'],
    }),
    getTasks: build.query<getTasksResponse, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'GET',
      }),
      providesTags: ['Boards'],
    }),
    getTaskById: build.query<
      getTaskByIdResponse,
      { boardId: string; columnId: string; taskId: string }
    >({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'GET',
      }),
      providesTags: ['Boards'],
    }),
    deleteTask: build.mutation<void, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
    }),
    updateTask: build.mutation<updateTaskResponse, updateTaskRequest>({
      query: ({ boardId, columnId, taskId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Boards'],
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
