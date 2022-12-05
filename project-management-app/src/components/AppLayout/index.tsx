import React from 'react';

import Header from 'components/Header';
import Main from 'components/Main';
import Footer from 'components/Footer';

import styles from './index.module.scss';

import { LayoutContent } from 'types';

const { page } = styles;

const AppLayout = ({ children }: LayoutContent) => (
  <div className={page}>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </div>
);

export default AppLayout;
