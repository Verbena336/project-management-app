import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import Paper from '@mui/material/Paper';

import styles from './AuthWrap.module.scss';

type LayoutContent = {
  children: ReactNode;
};

function Layout({ children }: LayoutContent) {
  return (
    <div className={styles.pageWrap}>
      <ToastContainer style={{ fontSize: '15px' }} />
      <Paper sx={{ borderRadius: '10px', backgroundColor: '#fbfbfb' }} elevation={3}>
        {children}
      </Paper>
    </div>
  );
}

export default Layout;
