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

// COLUMNS //////////////////////////////////////////
// COLUMNS //////////////////////////////////////////
// COLUMNS //////////////////////////////////////////
// COLUMNS //////////////////////////////////////////
// COLUMNS //////////////////////////////////////////
// COLUMNS //////////////////////////////////////////

// export type TColumn = {
//   id: string;
//   title: string;
//   order: number;
//   tasks: TTask[];
// };

// export type getColumnsResponse = {
//   id: string;
//   title: string;
//   order: number;
// }[];

// export type addUpdateColumnResponse = {
//   boardId: string;
//   body: { id: string; title: string; order: number };
// };

// export type addColumnRequest = {
//   boardId: string;
//   body: {
//     title: string;
//   };
// };

// export type updateColumnRequest = {
//   boardId: string;
//   columnId: string;
//   body: {
//     title: string;
//     order: number;
//   };
// };

// export type addColumnResponse = {
//   id: string;
//   title: string;
//   order: number;
// };

// COLUMNS //////////////////////////////////////////
// COLUMNS //////////////////////////////////////////
// COLUMNS //////////////////////////////////////////
// COLUMNS //////////////////////////////////////////
// COLUMNS //////////////////////////////////////////
// COLUMNS //////////////////////////////////////////

// export type TFile = {
//   filename: string;
//   fileSize: number;
// };

// TASKS //////////////////////////////////////////
// TASKS //////////////////////////////////////////
// TASKS //////////////////////////////////////////
// TASKS //////////////////////////////////////////
// TASKS //////////////////////////////////////////
// TASKS //////////////////////////////////////////

// export type TTask = {
//   id: string;
//   title: string;
//   order: 1;
//   description: string;
//   userId: string;
//   files: TFile[];
// };

// export type addTaskRequest = {
//   boardId: string;
//   columnId: string;
//   body: { title: string; description: string; userId: string };
// };

// export type addTaskResponse = {
//   id: string;
//   title: string;
//   description: string;
//   userId: string;
// };

// export type getTasksResponse = {
//   id: string;
//   title: string;
//   order: number;
//   description: string;
//   userId: string;
//   boardId: string;
//   columnId: string;
//   files: TFile[];
// }[];

// export type getTaskByIdResponse = {
//   id: string;
//   title: string;
//   order: 1;
//   description: string;
//   userId: string;
//   boardId: string;
//   columnId: string;
//   files: TFile[];
// };

// export type updateTaskResponse = {
//   id: string;
//   title: string;
//   order: number;
//   description: string;
//   userId: string;
//   boardId: string;
//   columnId: string;
// };

// export type updateTaskRequest = {
//   boardId: string;
//   columnId: string;
//   taskId: string;
//   body: {
//     title: string;
//     order: number;
//     description: string;
//     userId: string;
//     boardId: string;
//     columnId: string;
//   };
// };
