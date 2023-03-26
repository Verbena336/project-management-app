import React from 'react';

import styles from './index.module.scss';

import '../../utils/i18next';

const { footer, inner, created, githubs, link, logo } = styles;

import { developers } from '../../constants';

const Footer = () => {
  return (
    <footer className={footer}>
      <div className="container">
        <div className={inner}>
          <a
            target="_blank"
            href="https://rs.school/"
            className={`icon-school-logo ${logo}`}
            rel="noreferrer"
          >
            <div className={created}>&rsquo;22</div>
          </a>
          <div className={githubs}>
            {developers.map(({ name, url }, i) => (
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
