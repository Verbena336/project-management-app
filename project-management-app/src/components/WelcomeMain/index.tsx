import React from 'react';

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
              <div className={styles.text}>
                Текст какой-то Текст какой-то Текст какой-то Текст какой-то
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <h2 className="title">About App</h2>
            <div className={styles['about-app-content']}>
              <div className={styles['about-app-text']}></div>
              <div className={styles['about-app-image-box']}></div>
            </div>
          </section>
          <section className="about-team section">
            <h2 className="title">About Team</h2>
            <div className={styles['about-team-content']}>
              <div className={styles['about-team-img-box']}></div>
              <div className={styles.participants}>
                <div className={styles.participant}></div>
                <div className={styles.participant}></div>
                <div className={styles.participant}></div>
              </div>
            </div>
          </section>
          <section className="about-school section">
            <h2 className="title">About School</h2>
            <div className={styles['about-school-content']}>
              <div>
                Some text Some text Some text Some text Some text Some text Some text Some text Some
                text Some text Some text Some text Some text Some textSome text
              </div>
              <div className={styles['about-school-img-box']}>
                <img src="./assets/images/about-school.png" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default WelcomeMain;
