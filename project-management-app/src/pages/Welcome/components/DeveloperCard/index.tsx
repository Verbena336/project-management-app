import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

import '../../../../utils/i18next';

import { Props } from './types';

const { participant, line, info, img, definition } = styles;

const DeveloperCard = ({ data: { name, image, text, className } }: Props) => {
  const { t } = useTranslation('translation', { keyPrefix: 'team.teamItems' });
  return (
    <div className={participant}>
      <div className={`${line} ${className}`}></div>
      <div className={info}>
        <img src={image} className={img} />
        <div>{t(name)}</div>
      </div>
      <div className={definition}>{t(text)}</div>
    </div>
  );
};

export default DeveloperCard;
