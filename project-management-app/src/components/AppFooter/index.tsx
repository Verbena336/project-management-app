import React from 'react';

import styles from './index.module.scss';

import { developers } from '../../constants';

const { footer, inner, created, githubs, link } = styles;

const AppFooter = () => (
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
          {developers.map((person, i) => (
            <a className={link} key={i} href={person.url} target="_blank" rel="noreferrer">
              {person.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default AppFooter;
