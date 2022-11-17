import React, { useState } from 'react';
import { toast } from 'react-toastify';

import MainPaper from 'components/MainPaper';
import CreateEditModal from 'components/Modals/CreateEditModal';
import DeleteModal from 'components/Modals/DeleteModal';

import { useDeleteBoardMutation, useUpdateBoardMutation } from 'store/services/boardsApi';

import { ExistBoardProps } from './types';
import { updateBoardRequest } from 'store/services/types/boards';

import styles from './index.module.scss';
const {
  boardSection,
  boardContentWrapper,
  boardHeader,
  boardTitle,
  boardButtonWrapper,
  boardDescriptionWrapper,
  boardDescription,
} = styles;

const ExistBoard = ({ id, name, description }: ExistBoardProps) => {
  const [isModal, setIsModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteBoard] = useDeleteBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();

  const handleBoardPage = (e: React.MouseEvent<HTMLElement>) => {
    const board = e.target as HTMLElement;
    if (board.className.includes('ExistBoard')) {
      console.log(`go to ${id}`);
    }
  };

  const handleBoardEdit = async (data: Record<string, string>) => {
    const dataRequest = { id, body: data } as updateBoardRequest;
    try {
      const response = await updateBoard(dataRequest).unwrap();
      if (response.id) {
        toast.success(`The board is updated!`);
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Something is wrong with the server!');
    }
  };

  const handleBoardDelete = async () => {
    try {
      await deleteBoard(id).unwrap();
      toast.success(`The board is delete!`);
    } catch {
      toast.error('Something is wrong with the server!');
    }
  };

  return (
    <>
      {isModal && (
        <CreateEditModal
          title="Edit Board"
          description={true}
          handler={handleBoardEdit}
          closeHandler={() => setIsModal(!isModal)}
        />
      )}
      {isDeleteModal && (
        <DeleteModal
          handler={handleBoardDelete}
          closeHandler={() => setIsDeleteModal(!isDeleteModal)}
        />
      )}
      <section className={boardSection} onClick={handleBoardPage}>
        <MainPaper>
          <div className={boardContentWrapper}>
            <header className={boardHeader}>
              <p className={boardTitle}>{name}</p>
              <div className={boardButtonWrapper}>
                <button className="icon-board-edit" onClick={() => setIsModal(!isModal)}></button>
                <button
                  className="icon-board-column-remove"
                  onClick={() => setIsDeleteModal(!isDeleteModal)}
                ></button>
              </div>
            </header>
            <div className={boardDescriptionWrapper}>
              <p className={boardDescription}>{description}</p>
            </div>
          </div>
        </MainPaper>
      </section>
    </>
  );
};

export default ExistBoard;
