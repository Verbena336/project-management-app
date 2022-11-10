import React from 'react';

import Paper from '@mui/material/Paper';

import { muiPaperStyle } from '../../data/styles';

import { LayoutContent } from 'types';

const MainPaper = ({ children }: LayoutContent) => (
  <Paper sx={muiPaperStyle} elevation={3}>
    {children}
  </Paper>
);

export default MainPaper;
