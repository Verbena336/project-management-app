import React from 'react';

import { useAddColumnMutation } from 'store/services/columnsApi';

import styles from './index.module.scss';

import { Props } from './types';

const { btn } = styles;

const AddColumnBtn = ({ boardId }: Props) => {
  const [addColumn] = useAddColumnMutation();
  const handleAddColumn = async (title: string) => {
    try {
      const response = await addColumn({ boardId, title }).unwrap();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => handleAddColumn('Done');
  return (
    <button className={btn} onClick={handleClick}>
      <div className="icon-add-column"></div>
    </button>
  );
};

export default AddColumnBtn;
