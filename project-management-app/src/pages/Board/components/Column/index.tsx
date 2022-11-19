import React, { useState } from 'react';

import Task from '../Task';

import MainPaper from 'components/MainPaper';

import styles from './index.module.scss';

const { column, wrapper, header, title, content } = styles;

const Column = () => {
  const [tasks, setTasks] = useState<JSX.Element[]>([]);
  const addTask = () => {
    const arr = [...tasks];
    arr.push(<Task />);
    setTasks(arr);
  };
  const deleteColumn = () => {
    //По нажатию - Сonfirmation modal
    console.log('deleteColumn');
  };
  return (
    <section className={column}>
      <MainPaper>
        <div className={wrapper}>
          <header className={header}>
            <input className={title} type={'text'} defaultValue={'Заголовок'} />
            <button className="icon-board-column-remove" onClick={deleteColumn}></button>
          </header>
          <div className={content}>{tasks.map((task) => task)}</div>
          <button className="icon-add-task" onClick={addTask}>
            Добавить задачу
          </button>
        </div>
      </MainPaper>
    </section>
  );
};

export default Column;
