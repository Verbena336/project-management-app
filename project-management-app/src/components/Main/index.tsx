import React from 'react';

import styles from './index.module.scss';

import { LayoutContent } from 'types';

const { main } = styles;

const Main = ({ children }: LayoutContent) => <main className={main}>{children}</main>;

export default Main;
