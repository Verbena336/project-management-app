import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Spiner from '@mui/material/CircularProgress';
import { Button, TextField } from '@mui/material';
import MainPaper from 'components/MainPaper';

import { saveButtonTheme } from '../../../data/buttonsColorThemes';
import {
  muiModalButtonStyle,
  saveButtonBg,
  muiModalInputTitle,
  muiModalInputDescription,
} from 'data/styles';

import { CreateEditModalProps, formValues } from './types';

import commonStyles from '../index.module.scss';
import styles from './index.module.scss';
const { modalCloseButton, modalOverlay } = commonStyles;
const { modalWrapper, modalContent, modalTitle } = styles;

const CreateEditModal = ({ title, description, handler, closeHandler }: CreateEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>();

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    await handler(data);
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
            <form className={modalContent} onSubmit={handleSubmit(onSubmit)}>
              <button
                type="button"
                className={`${modalCloseButton} icon-exit-modal`}
                onClick={closeHandler}
              ></button>
              <p className={modalTitle}>{title}</p>
              <TextField
                sx={muiModalInputTitle}
                fullWidth
                size="medium"
                label={errors.title ? errors.title.message : t('createEditModal.name')}
                variant="standard"
                error={!!errors.title}
                {...register('title', {
                  required: {
                    value: true,
                    message: t('createEditModal.nameRequired'),
                  },
                  maxLength: {
                    value: 15,
                    message: t('createEditModal.nameLength'),
                  },
                })}
              />
              {description && (
                <TextField
                  sx={muiModalInputDescription}
                  fullWidth
                  multiline
                  rows={4}
                  label={
                    errors.description
                      ? errors.description.message
                      : t('createEditModal.description')
                  }
                  variant="outlined"
                  error={!!errors.description}
                  {...register('description', {
                    required: { value: true, message: t('createEditModal.descriptionRequired') },
                  })}
                />
              )}
              <ThemeProvider theme={saveButtonTheme}>
                <Button
                  sx={{ ...muiModalButtonStyle, ...saveButtonBg }}
                  size="medium"
                  variant="outlined"
                  type="submit"
                >
                  {t('createEditModal.save')}
                </Button>
              </ThemeProvider>
            </form>
          )}
        </MainPaper>
      </div>
    </div>
  );
};

export default CreateEditModal;
