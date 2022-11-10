import React from 'react';

import MuiButton from '@mui/material/Button';
import Switch from '@mui/material/Switch';

import styles from './index.module.scss';
const { header, inner, control } = styles;

const AppHeader = () => {
  const SignIn = 'Sign In';
  const SignUp = 'Sign Up';
  return (
    <header className={header}>
      <div className="container">
        <div className={inner}>
          <a href="#" className="icon-app-logo"></a>
          <div className={control}>
            <Switch defaultChecked />
            <MuiButton aria-label={SignIn} type="submit" variant="contained">
              {SignIn}
            </MuiButton>
            <MuiButton aria-label={SignUp} type="submit" variant="contained">
              {SignUp}
            </MuiButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
