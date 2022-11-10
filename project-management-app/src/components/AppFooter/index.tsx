import React from 'react';

import styles from './index.module.scss';

const { footer, inner, logo, created, githubs } = styles;

import { developers } from '../../constants';

const AppFooter = () => (
  <footer className={footer}>
    <div className="container">
      <div className={inner}>
        <div className={logo}>logo</div>
        <div className={created}>2022</div>
        <div className={githubs}>
          {developers.map((person, i) => (
            <a key={i} href={person.url} target="_blank" rel="noreferrer">
              {person.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default AppFooter;
