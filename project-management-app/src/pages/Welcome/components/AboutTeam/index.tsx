import React from 'react';
import { useTranslation } from 'react-i18next';

import MainPaper from 'components/MainPaper';
import DeveloperCard from '../DeveloperCard';

import '../../../../utils/i18next';

import styles from './index.module.scss';

const { content, participants, img } = styles;

import { cards } from '../../../../constants/index';

const AboutTeam = () => {
  const { t } = useTranslation();
  return (
    <section className="section">
      <h2 className="title">{t('team.title')}</h2>
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
};

export default AboutTeam;
