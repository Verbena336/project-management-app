import React from 'react';
import { useTranslation } from 'react-i18next';

import MainPaper from 'components/MainPaper';
import DeveloperCard from '../DeveloperCard';

import '../../../../utils/i18next';

import styles from './index.module.scss';

const { content, participants, img } = styles;

import { TeamItem } from './types';

const AboutTeam = () => {
  const { t } = useTranslation();
  const teamCards: TeamItem[] = t('team.teamItems', { returnObjects: true });
  return (
    <section className="section">
      <h2 className="title">{t('team.title')}</h2>
      <div className={content}>
        <img className={img} src="./assets/images/about-team.png" />
        <div className={participants}>
          {teamCards.map((card, i) => (
            <MainPaper key={i}>
              <DeveloperCard data={card} />
            </MainPaper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
