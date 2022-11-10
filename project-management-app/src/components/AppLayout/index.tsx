import React from 'react';

import AppHeader from 'components/AppHeader';
import AppMain from 'components/AppMain';
import AppFooter from 'components/AppFooter';

import { LayoutContent } from 'types';

const AppLayout = ({ children }: LayoutContent) => (
  <>
    <AppHeader />
    <AppMain>{children}</AppMain>
    <AppFooter />
  </>
);

export default AppLayout;
