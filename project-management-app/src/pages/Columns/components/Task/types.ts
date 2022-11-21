export type Props = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: File[];
};

type File = {
  filename: string;
  fileSize: number;
};
