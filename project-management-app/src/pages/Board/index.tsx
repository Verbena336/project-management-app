import React from 'react';

import AppLayout from 'components/AppLayout';

import Column from './components/Column';
import AddBtn from './components/AddColumnBtn';

import styles from './index.module.scss';

const { inner } = styles;

const Board = () => {
  return (
    <AppLayout>
      <div className="container">
        <div className={inner}>
          <Column />
          <Column />
          <AddBtn />
        </div>
      </div>
    </AppLayout>
  );
};

export default Board;
