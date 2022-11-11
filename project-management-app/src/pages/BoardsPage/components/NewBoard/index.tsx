import React from 'react';

import styles from './index.module.scss';

const NewBoard = () => {
  return (
    <button className={styles.newBoard}>
      <div className={styles.newBoardIcon}></div>
    </button>
  );
};

export default NewBoard;
