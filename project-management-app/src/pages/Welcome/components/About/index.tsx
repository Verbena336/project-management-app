import React from 'react';
import { useTranslation } from 'react-i18next';

import MainPaper from 'components/MainPaper';

import '../../../../utils/i18next';

import styles from './index.module.scss';

const { paper, content, text, line } = styles;

const About = () => {
  const { t } = useTranslation();
  return (
    <section className="section">
      <h2 className="title">{t('about.title')}</h2>
      <div className={content}>
        <MainPaper>
          <div className={paper}>
            <div className={line}></div>
            <div className={text}>{t('about.text')}</div>
            <img src="./assets/images/about-app.png" />
          </div>
        </MainPaper>
      </div>
    </section>
  );
};

export default About;
