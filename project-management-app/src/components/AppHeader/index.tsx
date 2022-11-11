import React from 'react';

import SignUpBtn from 'components/SignUpBtn';

import MuiButton from '@mui/material/Button';
import Switch from '@mui/material/Switch';

import { muiSignInBtn, muiSwitcherStyle } from '../../data/styles';

import styles from './index.module.scss';

const { header, inner, control, link } = styles;

const AppHeader = () => {
  const SignIn = 'Sign In';
  const SignUp = 'Sign Up';
  return (
    <header className={header}>
      <div className="container">
        <div className={inner}>
          <div className={link}>
            <a href="#" className="icon-app-logo"></a>
          </div>
          <div className={control}>
            <Switch defaultChecked color="default" sx={muiSwitcherStyle} />
            <MuiButton aria-label={SignIn} type="submit" variant="outlined" sx={muiSignInBtn}>
              {SignIn}
            </MuiButton>
            <SignUpBtn aria-label={SignUp}>{SignUp}</SignUpBtn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
