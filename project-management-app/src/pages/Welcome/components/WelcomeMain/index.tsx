import React from 'react';

import styles from './index.module.scss';

import HeroSection from '../HeroSection';
import AboutApp from '../About';
import AboutTeam from '../AboutTeam';
import AboutSchool from '../AboutSchool';

const { inner } = styles;

const WelcomeMain = () => (
  <div className="container">
    <div className={inner}>
      <HeroSection />
      <AboutApp />
      <AboutTeam />
      <AboutSchool />
    </div>
  </div>
);

export default WelcomeMain;
