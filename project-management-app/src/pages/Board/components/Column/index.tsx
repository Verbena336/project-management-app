import React from 'react';

import Task from '../Task';

import MainPaper from 'components/MainPaper';

import styles from './index.module.scss';

const { column, wrapper, header, title, icons, content } = styles;

const Column = () => {
  return (
    <section className={column}>
      <MainPaper>
        <div className={wrapper}>
          <header className={header}>
            <h3 className={title}>Заголовок</h3>
            <span className={icons}>
              <button className="icon-board-column-remove"></button>
            </span>
          </header>
          <div className={content}>
            <Task />
          </div>
          <button className="icon-add-task">Добавить задачу</button>
        </div>
      </MainPaper>
    </section>
  );
};

export default Column;
