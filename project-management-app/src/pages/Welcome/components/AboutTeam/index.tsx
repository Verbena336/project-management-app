import React from 'react';

import MainPaper from 'components/MainPaper';
import DeveloperCard from '../DeveloperCard';

import styles from './index.module.scss';

import { cards } from '../../../../constants';

const { content, participants, img } = styles;

const AboutTeam = () => (
  <section className="section">
    <h2 className="title">About Team</h2>
    <div className={content}>
      <img className={img} src="./assets/images/about-team.png" />
      <div className={participants}>
        {cards.map((card, i) => (
          <MainPaper key={i}>
            <DeveloperCard data={card} />
          </MainPaper>
        ))}
      </div>
    </div>
  </section>
);

export default AboutTeam;
