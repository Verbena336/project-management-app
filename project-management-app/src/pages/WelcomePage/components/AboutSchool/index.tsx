import React from 'react';

import MainPaper from 'components/MainPaper';

import styles from './index.module.scss';

const { about, content, text } = styles;

const AboutSchool = () => (
  <section className={`section ${about}`}>
    <h2 className="title">About School</h2>
    <div className="underline"></div>
    <MainPaper>
      <div className={content}>
        <div className={text}>
          Some text Some text Some text Some text Some text Some text Some text Some text Some text
          Some text Some text Some text Some text Some textSome text
        </div>
        <img src="./assets/images/about-school.png" />
      </div>
    </MainPaper>
  </section>
);

export default AboutSchool;
