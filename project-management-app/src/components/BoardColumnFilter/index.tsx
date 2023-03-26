import React from 'react';
import { useTranslation } from 'react-i18next';

import { TextField } from '@mui/material';

import { props } from './types';

import styles from './index.module.scss';
const { filterContainer } = styles;

const BoardColumnFilter = ({ selector, title, error, submitHandler, disable }: props) => {
  const { t } = useTranslation();
  const container = selector ? `${filterContainer} ${selector}` : filterContainer;

  return (
    <div className={container}>
      <TextField
        label={error ? t('BoardColumnFilter.error') : title}
        error={error}
        size="small"
        onChange={submitHandler}
        disabled={disable}
      />
    </div>
  );
};

export default BoardColumnFilter;
