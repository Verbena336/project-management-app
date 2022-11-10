import React from 'react';

import MainPaper from 'components/MainPaper';

import styles from './index.module.scss';

const { paper, content, text } = styles;

const AboutApp = () => (
  <section className="section">
    <h2 className="title">About App</h2>
    <div className="underline"></div>
    <div className={content}>
      <MainPaper>
        <div className={paper}>
          <div className={text}>
            Some text Some text Some text Some text Some text Some text Some text Some text Some
            text Some text Some text Some text Some text Some textSome text Some text Some text Some
            text Some text
          </div>
          <img src="./assets/images/about-app.png" />
        </div>
      </MainPaper>
    </div>
  </section>
);

export default AboutApp;
