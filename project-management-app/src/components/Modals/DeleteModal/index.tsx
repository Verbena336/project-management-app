import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Spiner from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import MainPaper from 'components/MainPaper';

import { DeleteModalProps } from './types';

import { deleteButtonsTheme } from 'data/buttonsColorThemes';
import { muiModalButtonStyle, cancelButtonBg, deleteButtonBg } from 'data/styles';

import commonStyles from '../index.module.scss';
import styles from './index.module.scss';
const { modalCloseButton, modalOverlay } = commonStyles;
const { modalWrapper, modalContent, modalTitle, modalButtonsWrapper } = styles;

const DeleteModal = ({ handler, closeHandler }: DeleteModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleDelete = async () => {
    setIsLoading(true);
    await handler();
    setIsLoading(false);
    closeHandler();
  };

  return (
    <div className={modalOverlay}>
      <div className={modalWrapper}>
        <MainPaper>
          {isLoading ? (
            <Spiner color="inherit" />
          ) : (
            <div className={modalContent}>
              <button
                type="button"
                className={`${modalCloseButton} icon-exit-modal`}
                onClick={closeHandler}
              ></button>
              <p className={modalTitle}>{t('deleteModal.title')}</p>
              <div className={modalButtonsWrapper}>
                <ThemeProvider theme={deleteButtonsTheme}>
                  <Button
                    sx={{ ...muiModalButtonStyle, ...cancelButtonBg }}
                    size="medium"
                    variant="text"
                    type="button"
                    onClick={closeHandler}
                  >
                    {t('deleteModal.cancel')}
                  </Button>
                  <Button
                    color="secondary"
                    sx={{ ...muiModalButtonStyle, ...deleteButtonBg }}
                    size="medium"
                    variant="outlined"
                    type="button"
                    onClick={handleDelete}
                  >
                    {t('deleteModal.delete')}
                  </Button>
                </ThemeProvider>
              </div>
            </div>
          )}
        </MainPaper>
      </div>
    </div>
  );
};

export default DeleteModal;
