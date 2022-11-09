import React from 'react';

import styles from './index.module.scss';

import { LayoutContent } from 'types';

const { main } = styles;

const AppMain = ({ children }: LayoutContent) => {
  return <main className={main}>{children}</main>;
};

export default AppMain;
