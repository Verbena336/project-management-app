import React from 'react';

import Paper from '@mui/material/Paper';

import { LayoutContent } from 'types';

const MainPaper = ({ children }: LayoutContent) => {
  return (
    <Paper sx={{ borderRadius: '10px', backgroundColor: '#fbfbfb' }} elevation={3}>
      {children}
    </Paper>
  );
};

export default MainPaper;
