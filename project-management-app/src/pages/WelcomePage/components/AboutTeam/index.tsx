import React from 'react';

import MainPaper from 'components/MainPaper';

import styles from './index.module.scss';

const { info, content, participants, participant, img, definition } = styles;

const AboutTeam = () => (
  <section className="section">
    <h2 className="title">About Team</h2>
    <div className="underline"></div>
    <div className={content}>
      <img className={img} src="./assets/images/about-team.png" />
      <div className={participants}>
        <MainPaper>
          <div className={participant}>
            <div className={info}>
              <img src="./assets/images/participants.png" className={img} />
              <div>Наташа</div>
            </div>
            <div className={definition}>
              Some text Some text Some text Some text Some text Some text Some text Some text Some
              text Some text Some text Some text
            </div>
          </div>
        </MainPaper>
        <MainPaper>
          <div className={participant}>
            <div className={info}>
              <img src="./assets/images/participants.png" className={img} />
              <div>Никита</div>
            </div>
            <div className={definition}>
              Some text Some text Some text Some text Some text Some text Some text Some text Some
              text Some text Some text Some text
            </div>
          </div>
        </MainPaper>
        <MainPaper>
          <div className={participant}>
            <div className={info}>
              <img src="./assets/images/participants.png" className={img} />
              <div>Виталий</div>
            </div>
            <div className={definition}>
              Some text Some text Some text Some text Some text Some text Some text Some text Some
              text Some text Some text Some text
            </div>
          </div>
        </MainPaper>
      </div>
    </div>
  </section>
);

export default AboutTeam;
