import React from 'react';

import styles from './index.module.scss';

const { newBoard } = styles;

const NewBoard = () => {
  return (
    <button className={newBoard}>
      <div className="icon-add-board"></div>
    </button>
  );
};

export default NewBoard;
