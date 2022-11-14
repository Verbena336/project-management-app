import React from 'react';
import { useTranslation } from 'react-i18next';

import MainPaper from 'components/MainPaper';

import '../../../../utils/i18next';

import styles from './index.module.scss';

const { hero, img, content, title, text, paper, line } = styles;

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className={hero}>
      <img className={img} src="./assets/images/hero.png" />
      <div className={content}>
        <h1 className={title}>{t('hero.title')}</h1>
        <MainPaper>
          <div className={paper}>
            <div className={line}></div>
            <div className={text}>{t('hero.text')}</div>
          </div>
        </MainPaper>
      </div>
    </section>
  );
};

export default HeroSection;
