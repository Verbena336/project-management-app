export type TFile = {
  filename: string;
  fileSize: number;
};

export type getFileParams = {
  taskId: string;
  filename: string;
};

export type addFile = {
  taskId: string;
  file: File;
};
