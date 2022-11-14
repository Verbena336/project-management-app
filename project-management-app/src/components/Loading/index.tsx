import React from 'react';

import styles from './index.module.scss';

const { loader, wrapper } = styles;

const Loading = () => (
  <div className={wrapper}>
    <span className={loader}></span>
  </div>
);

export default Loading;
