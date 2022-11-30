import { modalDeleteTaskState, modalEditTaskState } from '../Column/types';

export type PropsTask = {
  task: Task;
  index: number;
  boardId: string;
  columnId: string;
  setDeleteModalState: React.Dispatch<React.SetStateAction<modalDeleteTaskState>>;
  setEditModalState: React.Dispatch<React.SetStateAction<modalEditTaskState>>;
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
