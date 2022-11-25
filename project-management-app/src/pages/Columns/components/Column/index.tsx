import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Droppable } from 'react-beautiful-dnd';

import { Input } from '@mui/material';

import Task from '../Task';

import MainPaper from 'components/MainPaper';
import DeleteModal from 'components/Modals/DeleteModal';
import CreateEditModal from 'components/Modals/CreateEditModal';

import { useDeleteColumnMutation, useUpdateColumnMutation } from 'store/services/columnsApi';
import { useAddTaskMutation } from 'store/services/tasksApi';

import styles from './index.module.scss';

import { Props } from './types';
import { dataValues } from 'components/Modals/CreateEditModal/types';

const { column, wrapper, header, content, inputBtns, columnTitle } = styles;

const Column = ({ boardId, data: { title, id: columnId, order, tasks } }: Props) => {
  const ref: React.RefObject<HTMLInputElement> = useRef(null);
  const [isModal, setIsModal] = useState(false);
  const [isInputActive, setInputState] = useState(false);
  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const { t } = useTranslation();
  const [addTaskApi] = useAddTaskMutation();
  const [isModalTask, setIsModalTask] = useState(false);

  const addTask = async (values: dataValues) => {
    try {
      const { id } = await addTaskApi({
        boardId,
        columnId,
        body: {
          title: values.title,
          description: values.description,
          userId: localStorage.getItem('KanBanId')!,
        },
      }).unwrap();
      if (!id) {
        throw new Error();
      }
    } catch {
      toast.error(t('toastContent.serverError'));
    }
  };

  const handleModal = () => setIsModal(!isModal);
  const handleModalTask = () => setIsModalTask(!isModalTask);

  const handleTextField = () => setInputState(!isInputActive);

  const handleDeleteColumn = async () => {
    try {
      await deleteColumn({ boardId, columnId }).unwrap();
    } catch {
      toast.error(t('toastContent.serverError'));
    }
  };

  const handleEditColumn = async () => {
    if (!ref.current) return;
    const { value } = ref.current;
    const dataRequest = { boardId, columnId, body: { order, title: value } };
    try {
      const { id } = await updateColumn(dataRequest).unwrap();
      if (!id) {
        throw new Error();
      }
    } catch {
      toast.error(t('toastContent.serverError'));
    }
    setInputState(false);
  };
  return (
    <>
      {isModal && <DeleteModal handler={handleDeleteColumn} closeHandler={handleModal} />}
      {isModalTask && (
        <CreateEditModal
          title={t('createTask.title')}
          description={true}
          handler={addTask}
          closeHandler={handleModalTask}
        />
      )}
      <section className={column}>
        <MainPaper>
          <div className={wrapper}>
            <header className={header}>
              {isInputActive ? (
                <>
                  <Input sx={{ fontSize: '24px' }} defaultValue={title} inputProps={{ ref }} />
                  <span className={inputBtns}>
                    <button className={'icon-cancel'} onClick={handleTextField}></button>
                    <button className={'icon-submit'} onClick={handleEditColumn}></button>
                  </span>
                </>
              ) : (
                <h3 className={columnTitle} onClick={handleTextField}>
                  {title}
                </h3>
              )}
              <button className="icon-board-column-remove" onClick={handleModal}></button>
            </header>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <div className={content} ref={provided.innerRef} {...provided.droppableProps}>
                  {tasks &&
                    [...tasks]
                      .sort((a, b) => a.order - b.order)
                      .map((task, i) => (
                        <Task
                          key={task.id}
                          task={task}
                          index={i}
                          boardId={boardId}
                          columnId={columnId}
                        />
                      ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <button className="icon-add-task" onClick={() => setIsModalTask(!isModalTask)}>
              {t('columns.columnBtn')}
            </button>
          </div>
        </MainPaper>
      </section>
    </>
  );
};

export default Column;
