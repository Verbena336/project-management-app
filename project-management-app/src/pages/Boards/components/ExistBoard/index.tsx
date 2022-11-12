import React from 'react';

import MainPaper from 'components/MainPaper';

import styles from './index.module.scss';

const {
  boardSection,
  boardContentWrapper,
  boardHeader,
  boardTitle,
  boardButtonWrapper,
  boardEdit,
  boardRemove,
  boardDescriptionWrapper,
  boardDescription,
} = styles;

const ExistBoard = () => {
  return (
    <section className={boardSection}>
      <MainPaper>
        <div className={boardContentWrapper}>
          <header className={boardHeader}>
            <p className={boardTitle}>Board component</p>
            <div className={boardButtonWrapper}>
              <button className={boardEdit}>E</button>
              <button className={boardRemove}>R</button>
            </div>
          </header>
          <div className={boardDescriptionWrapper}>
            <p className={boardDescription}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </MainPaper>
    </section>
  );
};

export default ExistBoard;
