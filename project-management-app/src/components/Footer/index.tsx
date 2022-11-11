import React from 'react';

import styles from './index.module.scss';

import { developers } from '../../constants';

const { footer, inner, created, githubs, link } = styles;

const Footer = () => (
  <footer className={footer}>
    <div className="container">
      <div className={inner}>
        <a
          target="_blank"
          href="https://rs.school/"
          className="icon-school-logo"
          rel="noreferrer"
        ></a>
        <div className={created}>2022</div>
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

export default Footer;