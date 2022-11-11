import React from 'react';
import { Navigate } from 'react-router-dom';

import ExistBoard from './components/ExistBoard';
import NewBoard from './components/NewBoard';

import { PATH } from 'components/AppRoutes/types';

import styles from './index.module.scss';

const BoardsPage = () => {
  // if (!localStorage.getItem('KanBanToken')) return <Navigate to={PATH.WELCOME} />;

  return (
    <div className={styles.boardsWrapper}>
      <ExistBoard />
      <NewBoard />
    </div>
  );
};

export default BoardsPage;
