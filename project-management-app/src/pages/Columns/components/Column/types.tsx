import { TColumn } from 'store/services/types/columns';
import { CreateEditModalProps } from 'components/Modals/CreateEditModal/types';
import { DeleteModalProps } from 'components/Modals/DeleteModal/types';

export type Props = {
  boardId: string;
  index: number;
  isDrag: boolean;
  data: TColumn;
};

export type modalDeleteTaskState = {
  isDeleteTaskModal: boolean;
  deleteProps?: DeleteModalProps;
};

export type modalEditTaskState = {
  isEditTaskModal: boolean;
  editProps?: CreateEditModalProps;
};
