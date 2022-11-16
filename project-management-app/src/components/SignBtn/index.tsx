import React from 'react';

import MuiButton from '@mui/material/Button';

import { muiButtonStyle } from '../../data/styles';

import { SignBtnProps } from './types';

const SignBtn = ({ onClick, children }: SignBtnProps) => (
  <MuiButton type="submit" onClick={onClick} variant="contained" sx={muiButtonStyle}>
    {children}
  </MuiButton>
);

export default SignBtn;
