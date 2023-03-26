import React from 'react';
import { useTranslation } from 'react-i18next';

import MainPaper from 'components/MainPaper';

import '../../../../utils/i18next';

import styles from './index.module.scss';

const { about, content, text, line, wrapper } = styles;

const AboutSchool = () => {
  const { t } = useTranslation();
  return (
    <div className={wrapper}>
      <section className="section">
        <h2 className="title">{t('school.title')}</h2>
        <div className={about}>
          <MainPaper>
            <div className={content}>
              <div className={line}></div>
              <div className={text}>{t('school.text')}</div>
              <img src="./assets/images/about-school.png" />
            </div>
          </MainPaper>
        </div>
      </section>
    </div>
  );
};

export default AboutSchool;
