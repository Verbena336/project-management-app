import React from 'react';

import styles from './index.module.scss';

const { newBoard, newBoardIcon } = styles;

const NewBoard = () => {
  return (
    <button className={newBoard}>
      <div className={newBoardIcon}></div>
    </button>
  );
};

export default NewBoard;
