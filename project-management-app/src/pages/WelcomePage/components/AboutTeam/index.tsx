import React from 'react';

import styles from './index.module.scss';

import MainPaper from '../../../../components/MainPaper';

const { content, participants, img } = styles;

const AboutTeam = () => {
  return (
    <section className="section">
      <h2 className="title">About Team</h2>
      <div className={content}>
        <img className={img} src="./assets/images/about-team.png" />
        <div className={participants}>
          <MainPaper>
            Some text Some text Some text Some text Some text Some text Some text Some text Some
            text Some text Some text Some text
          </MainPaper>
          <MainPaper>
            Some text Some text Some text Some text Some text Some text Some text Some text Some
            text Some text Some text Some text
          </MainPaper>
          <MainPaper>
            Some text Some text Some text Some text Some text Some text Some text Some text Some
            text Some text Some text Some text
          </MainPaper>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
