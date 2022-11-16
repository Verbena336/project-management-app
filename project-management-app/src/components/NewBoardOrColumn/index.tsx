import React from 'react';

import { NewBoardOrColumnProps } from './types';

import styles from './index.module.scss';
const { newBoard } = styles;

const NewBoardOrColumn = ({ iconClass }: NewBoardOrColumnProps) => {
  return (
    <button className={newBoard}>
      <div className={iconClass}></div>
    </button>
  );
};

export default NewBoardOrColumn;
