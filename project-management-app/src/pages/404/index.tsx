import React from 'react';
import { useTranslation } from 'react-i18next';

import ErrorView from 'components/ErrorView';

const Page404 = () => {
  const { t } = useTranslation();

  return (
    <ErrorView
      title={t('404.title')}
      description={t('404.description')}
      firstTextPart={t('404.firstText')}
      secondTextPart={t('404.secondText')}
    />
  );
};

export default Page404;
