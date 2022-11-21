import { getColumnsResponse } from 'store/services/types/columns';
import { getTasksResponse } from 'store/services/types/tasks';

export const sortOrder = (data: getTasksResponse | getColumnsResponse) => {
  return data.sort((a, b) => a.order - b.order);
};
