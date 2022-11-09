import React from 'react';

import AppHeader from '../../components/AppHeader';
import WelcomeMain from 'components/WelcomeMain';
import AppFooter from 'components/AppFooter';

const WelcomePage = () => {
  return (
    <>
      <AppHeader />
      <WelcomeMain />
      <AppFooter />
    </>
  );
};

export default WelcomePage;
