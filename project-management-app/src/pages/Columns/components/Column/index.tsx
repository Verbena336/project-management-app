import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Task from '../Task';

import MainPaper from 'components/MainPaper';
import DeleteModal from 'components/Modals/DeleteModal';
import CreateEditModal from 'components/Modals/CreateEditModal';

import { useDeleteColumnMutation, useUpdateColumnMutation } from 'store/services/columnsApi';
import { useAddTaskMutation, useGetTasksQuery } from 'store/services/tasksApi';

import styles from './index.module.scss';

import { Props } from './types';
import { dataValues } from 'components/Modals/CreateEditModal/types';
import { sortOrder } from 'helpers/sortOrder';
import { getTaskByIdResponse, getTasksResponse } from 'store/services/types/tasks';

const { column, wrapper, header, input, content, submit, cancel } = styles;

const Column = ({ boardId, data: { title, id: columnId, order } }: Props) => {
  const ref: React.RefObject<HTMLInputElement> = useRef(null);
  const [isModal, setIsModal] = useState(false);
  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const { t } = useTranslation();
  const { data } = useGetTasksQuery({ boardId, columnId });
  const [addTaskApi] = useAddTaskMutation();
  const [isModalTask, setIsModalTask] = useState(false);

  const addTask = async (values: dataValues) => {
    try {
      const { id } = await addTaskApi({
        title: values.title,
        description: values.description,
        userId: localStorage.getItem('KanBanId')!,
        boardId,
        columnId,
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

  const cancelChanges = () => {
    if (!ref.current) return;
    ref.current.value = title;
  };

  const handleDeleteColumn = async () => {
    try {
      await deleteColumn({ boardId, columnId }).unwrap();
      toast.success(t('toastContent.deleteColumn'));
    } catch {
      toast.error(t('toastContent.serverError'));
    }
  };

  const handleEditColumn = async () => {
    if (!ref.current) return;
    const { value } = ref.current;
    const dataRequest = { boardId, columnId, order, title: value };
    try {
      const { id } = await updateColumn(dataRequest).unwrap();
      if (id) {
        toast.success(t('toastContent.editColumn'));
      } else {
        throw new Error();
      }
    } catch {
      toast.error(t('toastContent.serverError'));
    }
  };

  //! Ордер - временное решение, там надо смотреть уже когда днд делать будем, оно связано
  return (
    <>
      {isModal && <DeleteModal handler={handleDeleteColumn} closeHandler={handleModal} />}
      {isModalTask && (
        <CreateEditModal
          title={'Create Task'}
          description={true}
          handler={addTask}
          closeHandler={handleModalTask}
        />
      )}
      <section className={column} style={{ order }}>
        <MainPaper>
          <div className={wrapper}>
            <header className={header}>
              <input className={input} ref={ref} defaultValue={title} type="text" />
              <button className={submit} onClick={handleEditColumn}>
                Submit
              </button>
              <button className={cancel} onClick={cancelChanges}>
                Cancel
              </button>
              <button className="icon-board-column-remove" onClick={handleModal}></button>
            </header>
            <div className={content}>
              {/* {sortOrder(data!).map((task) => (
                // <Task key={task.id} {...task} />
              ))} */}
            </div>
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
