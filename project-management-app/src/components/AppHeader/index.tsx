import React from 'react';

import styles from './index.module.scss';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className="header-inner">Hello header</div>
      </div>
    </header>
  );
};

export default AppHeader;
