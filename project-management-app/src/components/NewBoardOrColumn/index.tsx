import React, { useState } from 'react';

import CreateEditModal from 'components/Modals/CreateEditModal';

import { NewBoardOrColumnProps } from './types';

import styles from './index.module.scss';
const { newBoard } = styles;

const NewBoardOrColumn = ({ iconClass, handleNewItem }: NewBoardOrColumnProps) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      {isModal && (
        <CreateEditModal
          title="Create Board"
          description={true}
          handler={handleNewItem}
          closeHandler={() => setIsModal(!isModal)}
        />
      )}
      <button className={newBoard} type="button" onClick={() => setIsModal(!isModal)}>
        <div className={iconClass}></div>
      </button>
    </>
  );
};

export default NewBoardOrColumn;
