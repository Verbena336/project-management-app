import React from 'react';

import MainPaper from '../MainPaper';

import styles from './index.module.scss';

const WelcomeMain = () => {
  return (
    <main className="main">
      <div className="container">
        <div className={styles.inner}>
          <section className={styles.hero}>
            <div className={styles['image-box']}>
              <img className={styles.image} src="./assets/images/hero.png" />
            </div>
            <div className={styles.content}>
              <h1 className={styles.title}>KanBan</h1>
              <MainPaper>Текст какой-то Текст какой-то Текст какой-то Текст какой-то</MainPaper>
            </div>
          </section>
          <section className={styles.section}>
            <h2 className="title">About App</h2>
            <div className={styles['about-app-content']}>
              <MainPaper>
                <div className={styles['paper-content']}>
                  <div className={styles['about-app-text']}>
                    Some text Some text Some text Some text Some text Some text Some text Some text
                    Some text Some text Some text Some text Some text Some textSome text Some text
                    Some text Some text Some text
                  </div>
                  <img src="./assets/images/about-app.png" />
                </div>
              </MainPaper>
            </div>
          </section>
          <section className={styles.section}>
            <h2 className="title">About Team</h2>
            <div className={styles['about-team-content']}>
              <img className={styles['about-team-img']} src="./assets/images/about-team.png" />
              <div className={styles.participants}>
                <MainPaper>
                  Some text Some text Some text Some text Some text Some text Some text Some text
                  Some text Some text Some text Some text
                </MainPaper>
                <MainPaper>
                  Some text Some text Some text Some text Some text Some text Some text Some text
                  Some text Some text Some text Some text
                </MainPaper>
                <MainPaper>
                  Some text Some text Some text Some text Some text Some text Some text Some text
                  Some text Some text Some text Some text
                </MainPaper>
              </div>
            </div>
          </section>
          <section className={`${styles.section} ${styles['about-school']}`}>
            <h2 className="title">About School</h2>

            <MainPaper>
              <div className={styles['about-school-content']}>
                <div className={styles['about-school-text']}>
                  Some text Some text Some text Some text Some text Some text Some text Some text
                  Some text Some text Some text Some text Some text Some textSome text
                </div>
                <img src="./assets/images/about-school.png" />
              </div>
            </MainPaper>
          </section>
        </div>
      </div>
    </main>
  );
};

export default WelcomeMain;
