import React from 'react';

import SignBtn from 'components/SignBtn';

import MuiButton from '@mui/material/Button';
import Switch from '@mui/material/Switch';

import { muiSignInBtn, muiSwitcherStyle } from '../../data/styles';

import { SignIn, SignUp } from '../../constants';

import styles from './index.module.scss';

const { header, inner, control, link } = styles;

const Header = () => (
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
          <SignBtn>{SignUp}</SignBtn>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
