export type PropsTask = {
  task: Task;
  index: number;
  boardId: string;
  columnId: string;
};

type File = {
  filename: string;
  fileSize: number;
};

type Task = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files: File[];
};
