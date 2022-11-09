import React from 'react';

import MuiButton from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

import styles from './SignupForm.module.scss';

function SignupForm() {
  return (
    <div className={styles.pageWrap}>
      <Paper sx={{ borderRadius: '10px', backgroundColor: '#fbfbfb' }} elevation={3}>
        <form className={styles.form}>
          <svg
            className={styles.backIcon}
            width="33"
            height="33"
            viewBox="0 0 33 33"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_447_126)">
              <path
                d="M6.875 16.5H26.125"
                stroke="#616161"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.875 16.5L15.125 24.75"
                stroke="#616161"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.875 16.5L15.125 8.25"
                stroke="#616161"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <TextField
            sx={{
              '& .MuiInputBase-input': {
                color: '#1740A9',
              },
            }}
            size="small"
            autoComplete="off"
            id="name"
            label="Name"
            variant="outlined"
          />
          <TextField
            sx={{
              '& .MuiInputBase-input': {
                color: '#1740A9',
              },
            }}
            size="small"
            autoComplete="off"
            id="login"
            label="Login"
            variant="outlined"
          />
          <TextField
            sx={{
              '& .MuiInputBase-input': {
                color: '#1740A9',
              },
            }}
            size="small"
            type="password"
            autoComplete="off"
            id="login"
            label="Password"
            variant="outlined"
          />
          <MuiButton variant="contained">Sign Up</MuiButton>
          <div className={styles.line}>
            <hr />
            OR
            <hr />
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default SignupForm;
