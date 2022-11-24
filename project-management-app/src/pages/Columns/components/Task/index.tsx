import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

import DeleteModal from 'components/Modals/DeleteModal';
import CreateEditModal from 'components/Modals/CreateEditModal';

import { useDeleteTaskMutation, useUpdateTaskMutation } from 'store/services/boardsApi';
import { useGetUserByIdQuery } from 'store/services/userApi';

import styles from './index.module.scss';

import { PropsTask } from './types';

const { text, task, textTitle, textDescr, controls } = styles;

const Task = ({
  task: { id, title, order, description, userId },
  index,
  boardId,
  columnId,
}: PropsTask) => {
  const [deleteTaskApi] = useDeleteTaskMutation();
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
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

  const handleModal = () => setIsModalEdit(!isModalEdit);

  return (
    <>
      {isModalEdit && (
        <CreateEditModal
          title={t('editTask.title')}
          editValues={{ name: title, description }}
          description={true}
          handler={handleTaskEdit}
          closeHandler={handleModal}
          user={data?.login}
        />
      )}
      {isModalDelete && (
        <DeleteModal handler={deleteTask} closeHandler={() => setIsModalDelete(!isModalDelete)} />
      )}
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
              <button className="icon-task-edit" onClick={() => setIsModalEdit(!isModalEdit)} />
              <button
                className="icon-task-action"
                onClick={() => setIsModalDelete(!isModalDelete)}
              />
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Task;
