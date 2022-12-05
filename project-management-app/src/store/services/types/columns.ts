import { TTask } from './tasks';

export type TColumn = {
  id: string;
  title: string;
  order: number;
  tasks: TTask[];
};

export type getColumnsResponse = {
  id: string;
  title: string;
  order: number;
}[];

export type addUpdateColumnResponse = {
  boardId: string;
  body: { id: string; title: string; order: number };
};

export type addColumnRequest = {
  boardId: string;
  body: {
    title: string;
  };
};

export type updateColumnRequest = {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    order: number;
  };
};

export type addColumnResponse = {
  id: string;
  title: string;
  order: number;
};
