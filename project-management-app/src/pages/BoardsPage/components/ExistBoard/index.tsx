import React from 'react';

import MainPaper from 'components/MainPaper';

import styles from './index.module.scss';

const ExistBoard = () => {
  return (
    <section className={styles.boardSection}>
      <MainPaper>
        <div className={styles.boardContentWrapper}>
          <header className={styles.boardHeader}>
            <p className={styles.boardTitle}>Board component</p>
            <div className={styles.boardButtonWrapper}>
              <button className={styles.boardEdit}>E</button>
              <button className={styles.boardRemove}>R</button>
            </div>
          </header>
          <div className={styles.boardDescriptionWrapper}>
            <p className={styles.boardDescription}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </MainPaper>
    </section>
  );
};

export default ExistBoard;
