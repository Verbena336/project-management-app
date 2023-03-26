import React from 'react';
import { ThemeProvider } from '@mui/material';

import { Button } from '@mui/material';

import { deleteButtonsTheme } from 'data/buttonsColorThemes';

import { DeleteButtonProps } from './types';

import { muiModalButtonStyle, deleteButtonBg } from 'data/styles';

const DeleteButton = ({ textContent, handler }: DeleteButtonProps) => {
  return (
    <ThemeProvider theme={deleteButtonsTheme}>
      <Button
        sx={{ ...muiModalButtonStyle, ...deleteButtonBg }}
        size="medium"
        variant="outlined"
        type="button"
        onClick={handler}
      >
        {textContent}
      </Button>
    </ThemeProvider>
  );
};

export default DeleteButton;
