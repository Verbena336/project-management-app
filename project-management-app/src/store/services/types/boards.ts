import { getColumnByIdResponse } from './columns';

export type getAllBoardsResponse = [addUpdateBoardResponse];

export type addBoardRequest = {
  title: string;
  description: string;
};

export type addUpdateBoardResponse = addBoardRequest & {
  id: string;
};

export type updateBoardRequest = {
  id: string;
  body: addBoardRequest;
};

export type getBoardResponse = addUpdateBoardResponse & {
  columns: [getColumnByIdResponse];
};
