export type getFileParams = {
  taskId: string;
  filename: string;
};

export type taskFile = {
  filename: string;
  fileSize: number;
};

export type addFile = {
  taskId: string;
  file: File;
};
