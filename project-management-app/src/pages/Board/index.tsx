import React from 'react';

import AppLayout from 'components/AppLayout';

import Column from './components/Column';
import AddColumnBtn from './components/AddColumnBtn';

import styles from './index.module.scss';

const { inner, content } = styles;

const Board = () => {
  return (
    <AppLayout>
      <div className="container">
        <div className={inner}>
          <a href="" className="icon-back-arrow">
            Название доски
          </a>
          <div className={content}>
            <Column />
            <AddColumnBtn />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Board;
