import React from 'react';

// import MainPaper from '../../../../components/MainPaper';

import styles from './index.module.scss';

import HeroSection from '../HeroSection';
import AboutApp from '../AboutApp';
import AboutTeam from '../AboutTeam';
import AboutSchool from '../AboutSchool';

const { inner } = styles;

const WelcomeMain = () => {
  return (
    <main className="main">
      <div className="container">
        <div className={inner}>
          <HeroSection />
          <AboutApp />
          <AboutTeam />
          <AboutSchool />
        </div>
      </div>
    </main>
  );
};

export default WelcomeMain;
