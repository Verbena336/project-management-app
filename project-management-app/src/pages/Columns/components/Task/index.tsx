import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Draggable } from 'react-beautiful-dnd';

import DeleteModal from 'components/Modals/DeleteModal';

import { useDeleteTaskMutation } from 'store/services/tasksApi';

import styles from './index.module.scss';

import { PropsTask } from './types';

const { text, task } = styles;

const Task = ({ task: { id, title, order, description }, index, boardId, columnId }: PropsTask) => {
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
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            className={task}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <p className={text}>
                {order} {title}
              </p>
              <p className={text}>{description}</p>
            </div>
            <button className="icon-task-action" onClick={() => setIsModal(!isModal)}></button>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Task;
