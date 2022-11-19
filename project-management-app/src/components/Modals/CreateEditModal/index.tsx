import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Spiner from '@mui/material/CircularProgress';
import { TextField } from '@mui/material';
import MainPaper from 'components/MainPaper';

import SaveButton from '../SaveButton';

import { muiModalInputTitle, muiModalInputDescription } from 'data/styles';

import { CreateEditModalProps, formValues } from './types';

import commonStyles from '../index.module.scss';
import styles from './index.module.scss';
const { modalCloseButton, modalOverlay, modalContainer } = commonStyles;
const { modalWrapper, modalContent, modalTitle, modalCreate, modalEdit } = styles;

const CreateEditModal = ({
  title,
  description,
  isEdit,
  handler,
  closeHandler,
}: CreateEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<formValues>();

  if (isEdit) {
    setValue('title', isEdit.name);
    if (isEdit.description) setValue('description', isEdit.description);
  }

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    await handler(data);
    setIsLoading(false);
    closeHandler();
  };

  return (
    <div className={modalContainer}>
      <div className={modalOverlay} onClick={closeHandler}></div>
      <div className={modalWrapper}>
        <MainPaper>
          <form
            className={`${modalContent} ${description ? modalCreate : modalEdit}`}
            onSubmit={handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <Spiner color="inherit" />
            ) : (
              <>
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
                <SaveButton textContent={t('createEditModal.save')} />
              </>
            )}
          </form>
        </MainPaper>
      </div>
    </div>
  );
};

export default CreateEditModal;
