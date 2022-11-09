import React from 'react';

import MuiButton from '@mui/material/Button';
import Switch from '@mui/material/Switch';

import styles from './index.module.scss';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.logo}>logo</div>
          <div>
            <Switch defaultChecked />
            <MuiButton
              aria-label="Sign In"
              className={styles.btn}
              type="submit"
              variant="contained"
            >
              Sign In
            </MuiButton>
            <MuiButton
              aria-label="Sign Up"
              className={styles.btn}
              type="submit"
              variant="contained"
            >
              Sign Up
            </MuiButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
