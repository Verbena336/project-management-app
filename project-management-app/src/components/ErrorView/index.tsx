import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { props } from './types';
import { PATH } from 'types';

import styles from './index.module.scss';
const { errorViewBackground, errorViewContainer, errorViewTitle, textContent, handleButton } =
  styles;

const ErrorView = ({ errorHandler, title, description, firstTextPart, secondTextPart }: props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handler = () => {
    if (errorHandler) errorHandler();
    navigate(PATH.ROOT);
  };

  return (
    <div className={errorViewBackground}>
      <div className={errorViewContainer}>
        <h2 className={errorViewTitle}>{title}</h2>
        <p className={textContent}>{description}</p>
        <p className={textContent}>
          {firstTextPart}{' '}
          <button className={handleButton} onClick={handler}>
            {t('ErrorView.button')}
          </button>{' '}
          {secondTextPart}
        </p>
      </div>
    </div>
  );
};

export default ErrorView;
