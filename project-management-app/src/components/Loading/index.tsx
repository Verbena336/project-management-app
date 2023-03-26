import React from 'react';

import Loader from './components/Loader';

import styles from './index.module.scss';

const { wrapper } = styles;

const Loading = () => (
  <div className={wrapper}>
    <Loader />
  </div>
);

export default Loading;
