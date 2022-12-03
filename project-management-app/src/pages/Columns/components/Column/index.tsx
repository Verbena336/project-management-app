import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

import { Input, InputAdornment } from '@mui/material';

import Task from '../Task';

import MainPaper from 'components/MainPaper';
import DeleteModal from 'components/Modals/DeleteModal';
import CreateEditModal from 'components/Modals/CreateEditModal';

import { useDeleteColumnMutation, useUpdateColumnMutation } from 'store/services/columnsApi';
import { useAddTaskMutation } from 'store/services/tasksApi';

import { Props } from './types';
import { dataValues } from 'components/Modals/CreateEditModal/types';
import { modalEditTaskState, modalDeleteTaskState } from './types';
import { PATH, TError } from 'types';

import styles from './index.module.scss';
import { muiTitleInput } from 'data/styles';

const { column, wrapper, header, content, columnTitle } = styles;

const Column = ({ boardId, index, isDrag, data: { title, id: columnId, order, tasks } }: Props) => {
  const ref: React.RefObject<HTMLInputElement> = useRef(null);
  const [isModalDeleteColumn, setIsModalDeleteColumn] = useState(false);
  const [isInputActive, setInputState] = useState(false);
  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const { t } = useTranslation();
  const [addTaskApi] = useAddTaskMutation();
  const [isModalCreateTask, setIsModalCreateTask] = useState(false);
  const [colTitle, setTitle] = useState(title);
  const [{ deleteProps, isDeleteTaskModal }, setModalDeleteTaskState] =
    useState<modalDeleteTaskState>({
      isDeleteTaskModal: false,
    });
  const [{ editProps, isEditTaskModal }, setModalEditTaskState] = useState<modalEditTaskState>({
    isEditTaskModal: false,
  });
  const [errorTitle] = useState(false);
  const navigate = useNavigate();

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
    } catch (err) {
      const error = err as TError;
      switch (error.status || error.statusCode) {
        case 401:
          toast.error(t('toastContent.unauthorized'));
          localStorage.removeItem('KanBanToken');
          localStorage.removeItem('KanBanLogin');
          localStorage.removeItem('KanBanId');
          navigate(PATH.WELCOME);
          break;
        default:
          toast.error(t('toastContent.serverError'));
      }
    }
  };

  const handleColumnDeleteModal = () => setIsModalDeleteColumn(!isModalDeleteColumn);
  const handleModalTask = () => setIsModalCreateTask(!isModalCreateTask);
  const handleTextField = () => setInputState(!isInputActive);

  const handleDeleteColumn = async () => {
    try {
      await deleteColumn({ boardId, columnId }).unwrap();
    } catch (err) {
      const error = err as TError;
      switch (error.status || error.statusCode) {
        case 401:
          toast.error(t('toastContent.unauthorized'));
          localStorage.removeItem('KanBanToken');
          localStorage.removeItem('KanBanLogin');
          localStorage.removeItem('KanBanId');
          navigate(PATH.WELCOME);
          break;
        default:
          toast.error(t('toastContent.serverError'));
      }
    }
  };

  const handleEditColumn = async () => {
    if (!ref.current) return;
    const value = ref.current.value ? ref.current.value : `Column ${order}`;
    const dataRequest = { boardId, columnId, body: { order, title: value } };
    setTitle(value);
    handleTextField();
    try {
      const { id } = await updateColumn(dataRequest).unwrap();
      if (!id) {
        throw new Error();
      }
    } catch (err) {
      const error = err as TError;
      switch (error.status || error.statusCode) {
        case 401:
          toast.error(t('toastContent.unauthorized'));
          localStorage.removeItem('KanBanToken');
          localStorage.removeItem('KanBanLogin');
          localStorage.removeItem('KanBanId');
          navigate(PATH.WELCOME);
          break;
        default:
          toast.error(t('toastContent.serverError'));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    if (e.relatedTarget?.classList.contains('icon-submit')) {
      handleEditColumn();
    } else {
      handleTextField();
    }
  };

  const handleEnterButton = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') handleEditColumn();
  };

  return (
    <>
      {isModalDeleteColumn && (
        <DeleteModal handler={handleDeleteColumn} closeHandler={handleColumnDeleteModal} />
      )}
      {isModalCreateTask && (
        <CreateEditModal
          title={t('createTask.title')}
          description={true}
          handler={addTask}
          closeHandler={handleModalTask}
        />
      )}
      {isDeleteTaskModal && deleteProps && (
        <DeleteModal handler={deleteProps.handler} closeHandler={deleteProps.closeHandler} />
      )}
      {isEditTaskModal && editProps && (
        <CreateEditModal
          title={editProps.title}
          editValues={editProps.editValues}
          description={editProps.description}
          handler={editProps.handler}
          closeHandler={editProps.closeHandler}
          user={editProps.user}
        />
      )}
      <Draggable draggableId={columnId} index={index} isDragDisabled={isDrag}>
        {(provided) => (
          <section
            className={column}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <MainPaper>
              <div className={wrapper}>
                <header className={header}>
                  {isInputActive ? (
                    <>
                      <Input
                        sx={muiTitleInput}
                        defaultValue={colTitle}
                        inputProps={{ ref }}
                        autoFocus
                        onBlur={(e) => handleBlur(e)}
                        onKeyUp={(e) => handleEnterButton(e)}
                        error={errorTitle}
                        startAdornment={
                          <InputAdornment position="start">
                            <button className={'icon-cancel'} onClick={handleTextField}></button>
                            <button className={'icon-submit'} onClick={handleEditColumn}></button>
                          </InputAdornment>
                        }
                      />
                    </>
                  ) : (
                    <h3 className={columnTitle} onClick={handleTextField}>
                      {colTitle}
                    </h3>
                  )}
                  <button
                    className="icon-board-column-remove"
                    onClick={handleColumnDeleteModal}
                    style={{ marginLeft: '10px' }}
                  ></button>
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
                              setDeleteModalState={setModalDeleteTaskState}
                              setEditModalState={setModalEditTaskState}
                            />
                          ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <button className="icon-add-task" onClick={handleModalTask}>
                  {t('columns.columnBtn')}
                </button>
              </div>
            </MainPaper>
          </section>
        )}
      </Draggable>
    </>
  );
};

export default Column;
