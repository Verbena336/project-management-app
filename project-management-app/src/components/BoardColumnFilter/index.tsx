import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField, Button } from '@mui/material';

import { props } from './types';

import styles from './index.module.scss';
const { filterContainer } = styles;

const BoardColumnFilter = ({ title, data, handleData }: props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (error) setError(false);
    setValue(e.target.value);
  };

  const submitHandler = () => {
    if (!data) return;
    if (!value && data) return handleData(data);

    const result = data.filter((board) => board.title.includes(value));

    if (data?.length && !result.length) {
      setError(true);
      return;
    }

    handleData(result);
  };

  return (
    <form className={filterContainer}>
      <TextField
        label={error ? t('BoardColumnFilter.error') : title}
        error={error}
        size="small"
        onChange={inputHandler}
      />
      <Button variant="contained" onClick={submitHandler}>
        {t('BoardColumnFilter.search')}
      </Button>
    </form>
  );
};

export default BoardColumnFilter;
