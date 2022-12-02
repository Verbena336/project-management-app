import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Spinner from '@mui/material/CircularProgress';
import { TextField } from '@mui/material';
import MainPaper from 'components/MainPaper';

import SaveButton from '../SaveButton';

import { muiModalInputTitle, muiModalInputDescription } from 'data/styles';

import { CreateEditModalProps, formValues, dataValues } from './types';

import commonStyles from '../index.module.scss';
import styles from './index.module.scss';
const { modalCloseButton, modalOverlay, modalContainer } = commonStyles;
const {
  modalWrapper,
  modalContent,
  modalTitle,
  userName,
  editTask,
  createEditBoard,
  createColumn,
  createEditBoardForm,
  editTaskForm,
  createColumnForm,
} = styles;

const CreateEditModal = ({
  title,
  description,
  editValues,
  handler,
  closeHandler,
  user,
}: CreateEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>({ mode: 'onSubmit' });
  const wrapperClass = `${modalWrapper} ${
    user ? editTask : description ? createEditBoard : createColumn
  }`;
  const formClass = `${modalContent} ${
    user ? editTaskForm : description ? createEditBoardForm : createColumnForm
  }`;

  const onSubmit = async (data: dataValues) => {
    setIsLoading(true);
    await handler(data);
    setIsLoading(false);
    closeHandler();
  };

  return (
    <div className={modalContainer}>
      <div className={modalOverlay} onClick={closeHandler}></div>
      <div className={wrapperClass}>
        <MainPaper>
          <form className={formClass} onSubmit={handleSubmit(onSubmit)}>
            {isLoading ? (
              <Spinner color="inherit" />
            ) : (
              <>
                <button
                  type="button"
                  className={`${modalCloseButton} icon-exit-modal`}
                  onClick={closeHandler}
                ></button>
                <p className={modalTitle}>{title}</p>
                {user && (
                  <p className={userName}>
                    {t('createEditModal.userName')} {user}
                  </p>
                )}
                <TextField
                  sx={muiModalInputTitle}
                  fullWidth
                  size="medium"
                  label={errors.title ? errors.title.message : t('createEditModal.name')}
                  variant="standard"
                  error={!!errors.title}
                  defaultValue={editValues?.name}
                  autoFocus
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
                    rows={5}
                    defaultValue={editValues?.description}
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
