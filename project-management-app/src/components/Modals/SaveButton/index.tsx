import React from 'react';
import { ThemeProvider } from '@mui/material';

import { Button } from '@mui/material';

import { saveButtonTheme } from '../../../data/buttonsColorThemes';

import { SaveButtonProps } from './types';

import { muiModalButtonStyle, saveButtonBg } from 'data/styles';

const SaveButton = ({ textContent }: SaveButtonProps) => {
  return (
    <ThemeProvider theme={saveButtonTheme}>
      <Button
        sx={{ ...muiModalButtonStyle, ...saveButtonBg }}
        size="medium"
        variant="outlined"
        type="submit"
      >
        {textContent}
      </Button>
    </ThemeProvider>
  );
};

export default SaveButton;
