import { TColumn } from './columns';

export type GetBoardByIdResponse = {
  id: string;
  title: string;
  description: string;
  columns: TColumn[];
};

export type getAllBoardsResponse = {
  id: string;
  title: string;
  description: string;
}[];

export type addUpdateBoardResponse = {
  id: string;
  title: string;
  description: string;
};

export type addBoardRequest = {
  title: string;
  description: string;
};

export type updateBoardRequest = {
  id: string;
  body: { title: string; description: string };
};
