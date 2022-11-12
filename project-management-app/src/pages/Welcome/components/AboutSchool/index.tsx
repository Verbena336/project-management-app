import React from 'react';

import MainPaper from 'components/MainPaper';

import styles from './index.module.scss';

const { about, content, text, line } = styles;

const AboutSchool = () => (
  <section className="section">
    <h2 className="title">About School</h2>
    <div className={about}>
      <MainPaper>
        <div className={content}>
          <div className={line}></div>
          <div className={text}>
            Some text Some text Some text Some text Some text Some text Some text Some text Some
            text Some text Some text Some text Some text Some textSome text
          </div>
          <img src="./assets/images/about-school.png" />
        </div>
      </MainPaper>
    </div>
  </section>
);

export default AboutSchool;
