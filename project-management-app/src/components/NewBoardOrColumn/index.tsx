import React, { useState } from 'react';

import CreateEditModal from 'components/Modals/CreateEditModal';

import { NewBoardOrColumnProps } from './types';

import styles from './index.module.scss';
const { newBoard, newColumn } = styles;

const NewBoardOrColumn = ({ modalTitle, iconClass, handleNewItem }: NewBoardOrColumnProps) => {
  const [isModal, setIsModal] = useState(false);
  const handleModal = () => setIsModal(!isModal);

  return (
    <>
      {isModal && (
        <CreateEditModal
          title={modalTitle}
          description={iconClass.includes('board') && true}
          handler={handleNewItem}
          closeHandler={handleModal}
        />
      )}
      <button
        className={iconClass.includes('board') ? newBoard : newColumn}
        type="button"
        onClick={handleModal}
      >
        <div className={iconClass}></div>
      </button>
    </>
  );
};

export default NewBoardOrColumn;
