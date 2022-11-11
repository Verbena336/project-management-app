import React from 'react';

import AppHeader from 'components/Header';
import AppMain from 'components/Main';
import AppFooter from 'components/Footer';

import { LayoutContent } from 'types';

const AppLayout = ({ children }: LayoutContent) => (
  <>
    <AppHeader />
    <AppMain>{children}</AppMain>
    <AppFooter />
  </>
);

export default AppLayout;
