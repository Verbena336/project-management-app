import { taskFile } from './files';
import { addTaskResponse } from './tasks';

export type getColumnsResponse = [addUpdateColumnResponse];

export type columnRequest = {
  boardId: string;
  columnId: string;
};

export type getColumnByIdResponse = addUpdateColumnResponse & {
  tasks: [
    addTaskResponse & {
      order: number;
      done: boolean;
      files: [taskFile];
    }
  ];
};

export type addColumnRequest = {
  boardId: string;
  title: string;
};

export type updateColumnRequest = {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
};

export type addUpdateColumnResponse = {
  id: string;
  title: string;
  order: number;
};
