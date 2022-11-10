import React from 'react';

import styles from './index.module.scss';

const AppFooter = () => (
  <footer className={styles.footer}>
    <div className="container">
      <div className={styles.inner}>
        <div className={styles.logo}>logo</div>
        <div className={styles.created}>2022</div>
        <div className={styles.githubs}>
          <a href="#">ссылка 1</a>
          <a href="#">ссылка 2</a>
          <a href="#">ссылка 3</a>
        </div>
      </div>
    </div>
  </footer>
);

export default AppFooter;
