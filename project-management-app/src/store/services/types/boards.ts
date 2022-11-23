// import { getColumnByIdResponse } from './columns';

// export type getAllBoardsResponse = [addUpdateBoardResponse];

// export type addBoardRequest = {
//   title: string;
//   description: string;
// };

// export type addUpdateBoardResponse = addBoardRequest & {
//   id: string;
// };

// export type updateBoardRequest = {
//   id: string;
//   body: addBoardRequest;
// };

// export type getBoardResponse = addUpdateBoardResponse & {
//   columns: [getColumnByIdResponse];
// };

export type GetBoardByIdResponse = {
  id: string;
  title: string;
  description: string;
  columns: TColumn[];
};

export type TColumn = {
  id: string;
  title: string;
  order: number;
  tasks: TTask[];
};

export type TTask = {
  id: string;
  title: string;
  order: 1;
  description: string;
  userId: string;
  files: File[];
};

export type File = {
  filename: string;
  fileSize: number;
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
  files: File[];
}[];

export type getTaskByIdResponse = {
  id: string;
  title: string;
  order: 1;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: File[];
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

export type addColumnResponse = {
  id: string;
  title: string;
  order: number;
};
