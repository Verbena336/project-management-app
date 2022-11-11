import React from 'react';

import MuiButton from '@mui/material/Button';

import { muiButtonStyle } from '../../data/styles';

import { LayoutContent } from 'types';

const SignBtn = ({ children }: LayoutContent) => (
  <MuiButton type="submit" variant="contained" sx={muiButtonStyle}>
    {children}
  </MuiButton>
);

export default SignBtn;
