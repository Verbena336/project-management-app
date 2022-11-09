import React from 'react';

import AppHeader from 'components/AppHeader';
import AppMain from 'components/AppMain';
import WelcomeMain from 'pages/WelcomePage/components/WelcomeMain';
import AppFooter from 'components/AppFooter';

const WelcomePage = () => {
  return (
    <>
      <AppHeader />
      <AppMain>
        <WelcomeMain />
      </AppMain>
      <AppFooter />
    </>
  );
};

export default WelcomePage;
