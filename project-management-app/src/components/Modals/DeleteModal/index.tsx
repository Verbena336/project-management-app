import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Spinner from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import MainPaper from 'components/MainPaper';

import DeleteButton from '../DeleteButton';

import { DeleteModalProps } from './types';

import { deleteButtonsTheme } from 'data/buttonsColorThemes';
import { muiModalButtonStyle, cancelButtonBg } from 'data/styles';

import commonStyles from '../index.module.scss';
import styles from './index.module.scss';
const { modalCloseButton, modalOverlay, modalContainer } = commonStyles;
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
    <div className={modalContainer}>
      <div className={modalOverlay} onClick={closeHandler}></div>
      <div className={modalWrapper}>
        <MainPaper>
          <div className={modalContent}>
            {isLoading ? (
              <Spinner color="inherit" />
            ) : (
              <>
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
                      color="secondary"
                      size="medium"
                      variant="text"
                      type="button"
                      onClick={closeHandler}
                    >
                      {t('deleteModal.cancel')}
                    </Button>
                  </ThemeProvider>
                  <DeleteButton textContent={t('deleteModal.delete')} handler={handleDelete} />
                </div>
              </>
            )}
          </div>
        </MainPaper>
      </div>
    </div>
  );
};

export default DeleteModal;
