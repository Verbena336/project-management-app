import { getAllBoardsResponse } from 'store/services/types/boards';

export type props = {
  title: string;
  data: getAllBoardsResponse | undefined;
  handleData: React.Dispatch<React.SetStateAction<getAllBoardsResponse>>;
};
