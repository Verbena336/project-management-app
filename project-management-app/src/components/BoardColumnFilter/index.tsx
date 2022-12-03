import React from 'react';
import { useTranslation } from 'react-i18next';

import { TextField } from '@mui/material';

import { props } from './types';

import styles from './index.module.scss';
const { filterContainer } = styles;

const BoardColumnFilter = ({ title, error, submitHandler }: props) => {
  const { t } = useTranslation();

  return (
    <div className={filterContainer}>
      <TextField
        label={error ? t('BoardColumnFilter.error') : title}
        error={error}
        size="small"
        onChange={submitHandler}
      />
    </div>
  );
};

export default BoardColumnFilter;
