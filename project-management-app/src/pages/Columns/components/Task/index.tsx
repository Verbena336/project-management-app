import React, { useState } from 'react';
import { toast } from 'react-toastify';

import DeleteModal from 'components/Modals/DeleteModal';

import { useDeleteTaskMutation } from 'store/services/tasksApi';

import styles from './index.module.scss';

import { Props } from './types';

const { text, task } = styles;

const Task = ({ id, title, order, description, userId, boardId, columnId, files }: Props) => {
  const [deleteTaskApi] = useDeleteTaskMutation();
  const [isModal, setIsModal] = useState(false);

  const deleteTask = async () => {
    try {
      await deleteTaskApi({ boardId, columnId, taskId: id }).unwrap();
    } catch (err) {
      toast.error('Unknown error');
    }
  };

  return (
    <>
      {isModal && <DeleteModal handler={deleteTask} closeHandler={() => setIsModal(!isModal)} />}
      <div className={task} style={{ order }}>
        <div>
          <p className={text}>
            {order} {title}
          </p>
          <p className={text}>{description}</p>
        </div>
        <button className="icon-task-action" onClick={() => setIsModal(!isModal)}></button>
      </div>
    </>
  );
};

export default Task;
