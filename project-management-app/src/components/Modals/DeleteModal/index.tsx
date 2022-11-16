import React from 'react';
import { ThemeProvider } from '@mui/material';

import { Button } from '@mui/material';
import MainPaper from 'components/MainPaper';

import { deleteButtonsTheme } from 'data/buttonsColorThemes';
import { muiModalButtonStyle, cancelButtonBg, deleteButtonBg } from 'data/styles';

import commonStyles from '../index.module.scss';
import styles from './index.module.scss';
const { modalCloseButton, modalOverlay } = commonStyles;
const { modalWrapper, modalContent, modalTitle, modalButtonsWrapper } = styles;

const DeleteModal = () => {
  return (
    <div className={modalOverlay}>
      <div className={modalWrapper}>
        <MainPaper>
          <div className={modalContent}>
            <button type="button" className={`${modalCloseButton} icon-exit-modal`}></button>
            <p className={modalTitle}>Do you want to delete?</p>
            <div className={modalButtonsWrapper}>
              <ThemeProvider theme={deleteButtonsTheme}>
                <Button
                  sx={{ ...muiModalButtonStyle, ...cancelButtonBg }}
                  size="small"
                  variant="text"
                  type="button"
                  onClick={() => console.log('cancel')}
                >
                  Cancel
                </Button>
                <Button
                  color="secondary"
                  sx={{ ...muiModalButtonStyle, ...deleteButtonBg }}
                  size="small"
                  variant="outlined"
                  type="button"
                  onClick={() => console.log('del')}
                >
                  Delete
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </MainPaper>
      </div>
    </div>
  );
};

export default DeleteModal;
