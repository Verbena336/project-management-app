import { TFile } from './files';

export type TTask = {
  id: string;
  title: string;
  order: 1;
  description: string;
  userId: string;
  files: TFile[];
};

export type addTaskRequest = {
  boardId: string;
  columnId: string;
  body: { title: string; description: string; userId: string };
};

export type addTaskResponse = {
  id: string;
  title: string;
  description: string;
  userId: string;
};

export type getTasksResponse = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: TFile[];
}[];

export type getTaskByIdResponse = {
  id: string;
  title: string;
  order: 1;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: TFile[];
};

export type updateTaskResponse = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};

export type updateTaskRequest = {
  boardId: string;
  columnId: string;
  taskId: string;
  body: {
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
  };
};
