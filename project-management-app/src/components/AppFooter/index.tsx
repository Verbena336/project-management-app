import React from 'react';

import styles from './index.module.scss';

const AppFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="footer-inner">Hello footer</div>
      </div>
    </footer>
  );
};

export default AppFooter;
