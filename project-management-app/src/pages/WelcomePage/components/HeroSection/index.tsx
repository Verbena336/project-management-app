import React from 'react';

import MainPaper from 'components/MainPaper';

import styles from './index.module.scss';

const { hero, img, content, title, text, paper, line } = styles;

const HeroSection = () => (
  <section className={hero}>
    <img className={img} src="./assets/images/hero.png" />
    <div className={content}>
      <h1 className={title}>KanBan</h1>
      <MainPaper>
        <div className={paper}>
          <div className={line}></div>
          <div className={text}>Текст какой-то Текст какой-то Текст какой-то Текст какой-то</div>
        </div>
      </MainPaper>
    </div>
  </section>
);

export default HeroSection;
