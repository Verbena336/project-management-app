import React from 'react';

import MuiButton from '@mui/material/Button';

import { LayoutContent } from 'types';

const SignUpBtn = ({ children }: LayoutContent) => (
  <MuiButton type="submit" variant="contained">
    {children}
  </MuiButton>
);

export default SignUpBtn;
