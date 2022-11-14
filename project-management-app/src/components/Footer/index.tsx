import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

import '../../utils/i18next';

const { footer, inner, created, githubs, link } = styles;

import { FooterLink } from './types';

const Footer = () => {
  const { t } = useTranslation();
  const footerLinksArr: FooterLink[] = t('footer.footerLinks', {
    returnObjects: true,
  });
  return (
    <footer className={footer}>
      <div className="container">
        <div className={inner}>
          <a
            target="_blank"
            href="https://rs.school/"
            className="icon-school-logo"
            rel="noreferrer"
          ></a>
          <div className={created}>{t('footer.year')}</div>
          <div className={githubs}>
            {footerLinksArr.map(({ name, url }, i) => (
              <a className={link} key={i} href={url} target="_blank" rel="noreferrer">
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
