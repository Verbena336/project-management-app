import React from 'react';

import MainPaper from 'components/MainPaper';

import styles from './index.module.scss';

const {
  boardSection,
  boardContentWrapper,
  boardHeader,
  boardTitle,
  boardButtonWrapper,
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
              <button className="icon-board-edit"></button>
              <button className="icon-board-column-remove"></button>
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
