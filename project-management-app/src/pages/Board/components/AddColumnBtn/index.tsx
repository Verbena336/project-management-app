import React from 'react';

import styles from './index.module.scss';

const { btn } = styles;

const AddColumnBtn = () => {
  return (
    <button className={btn}>
      <div className="icon-add-column"></div>
    </button>
  );
};

export default AddColumnBtn;
