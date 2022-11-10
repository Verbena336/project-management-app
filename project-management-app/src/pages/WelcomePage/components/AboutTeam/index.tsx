import React from 'react';

import MainPaper from 'components/MainPaper';

import styles from './index.module.scss';

const { info, content, participants, participant, img, definition, line, blue, green, yellow } =
  styles;

const AboutTeam = () => (
  <section className="section">
    <h2 className="title">About Team</h2>
    <div className={content}>
      <img className={img} src="./assets/images/about-team.png" />
      <div className={participants}>
        <MainPaper>
          <div className={participant}>
            <div className={`${line} ${blue}`}></div>
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
            <div className={`${line} ${green}`}></div>
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
            <div className={`${line} ${yellow}`}></div>
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
