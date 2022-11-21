import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Task from '../Task';

import MainPaper from 'components/MainPaper';
import DeleteModal from 'components/Modals/DeleteModal';

import { useDeleteColumnMutation, useUpdateColumnMutation } from 'store/services/columnsApi';

import styles from './index.module.scss';

import { Props } from './types';

const { column, wrapper, header, input, content, submit, cancel } = styles;

const Column = ({ boardId, data: { title, id: columnId, order } }: Props) => {
  console.log(`title: ${title}; id: ${columnId}`);
  const ref: React.RefObject<HTMLInputElement> = useRef(null);
  const [isModal, setIsModal] = useState(false);
  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const { t } = useTranslation();

  // Temprorary
  const [tasks, setTasks] = useState<JSX.Element[]>([]);
  const addTask = () => {
    const arr = [...tasks];
    arr.push(<Task />);
    setTasks(arr);
  };

  const handleModal = () => setIsModal(!isModal);

  const cancelChanges = () => {
    if (!ref.current) return;
    ref.current.value = title;
  };

  const handleDeleteColumn = async () => {
    console.log(`delete ${columnId}`);
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
              {tasks.map((task, i) => (
                <span key={i}>{task}</span>
              ))}
            </div>
            <button className="icon-add-task" onClick={addTask}>
              {t('columns.columnBtn')}
            </button>
          </div>
        </MainPaper>
      </section>
    </>
  );
};

export default Column;
