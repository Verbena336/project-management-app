import React from 'react';

import styles from './index.module.scss';

const { loader } = styles;

const Loading = () => {
  return <span className={loader}></span>;
};

export default Loading;
