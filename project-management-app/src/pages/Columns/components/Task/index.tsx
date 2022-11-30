import React from 'react';
import { toast } from 'react-toastify';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

import { useDeleteTaskMutation, useUpdateTaskMutation } from 'store/services/tasksApi';
import { useGetUserByIdQuery } from 'store/services/userApi';

import styles from './index.module.scss';

import { PropsTask } from './types';

const { text, task, textTitle, textDescr, controls } = styles;

const Task = ({
  task: { id, title, order, description, userId },
  index,
  boardId,
  columnId,
  setDeleteModalState,
  setEditModalState,
}: PropsTask) => {
  const [deleteTaskApi] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const { data } = useGetUserByIdQuery(userId);
  const { t } = useTranslation();

  const deleteTask = async () => {
    try {
      await deleteTaskApi({ boardId, columnId, taskId: id }).unwrap();
    } catch {
      toast.error(t('toastContent.serverError'));
    }
  };

  const handleTaskEdit = async (data: { title: string; description: string }) => {
    const body = {
      order,
      userId,
      boardId,
      columnId,
      title: data.title,
      description: data.description,
    };
    const dataRequest = { boardId, columnId, taskId: id, body };
    try {
      await updateTask(dataRequest).unwrap();
    } catch {
      toast.error(t('toastContent.serverError'));
    }
  };

  const handleDeleteModal = () => {
    setDeleteModalState((s) => ({
      ...s,
      isDeleteTaskModal: true,
      deleteProps: {
        handler: deleteTask,
        closeHandler: () =>
          setDeleteModalState((s) => ({ ...s, isDeleteTaskModal: !s.isDeleteTaskModal })),
      },
    }));
  };

  const handleEditModal = () => {
    setEditModalState((s) => ({
      ...s,
      isEditTaskModal: true,
      editProps: {
        title: t('editTask.title'),
        editValues: { name: title, description },
        description: true,
        handler: handleTaskEdit,
        closeHandler: () =>
          setEditModalState((s) => ({ ...s, isEditTaskModal: !s.isEditTaskModal })),
        user: data?.login,
      },
    }));
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={task}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={text}>
            <p className={textTitle}>{title}</p>
            <p className={textDescr}>{description}</p>
          </div>
          <div className={controls}>
            <button className="icon-task-edit" onClick={handleEditModal} />
            <button className="icon-task-action" onClick={handleDeleteModal} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
