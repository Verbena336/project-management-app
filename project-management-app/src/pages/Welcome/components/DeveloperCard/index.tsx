import React from 'react';

import styles from './index.module.scss';

import { Props } from './types';

const { participant, line, info, img, definition } = styles;

const DeveloperCard = ({ data: { name, image, text, className } }: Props) => (
  <div className={participant}>
    <div className={`${line} ${className}`}></div>
    <div className={info}>
      <img src={image} className={img} />
      <div>{name}</div>
    </div>
    <div className={definition}>{text}</div>
  </div>
);

export default DeveloperCard;
