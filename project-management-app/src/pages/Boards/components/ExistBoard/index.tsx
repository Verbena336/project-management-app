import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import MainPaper from 'components/MainPaper';
import CreateEditModal from 'components/Modals/CreateEditModal';
import DeleteModal from 'components/Modals/DeleteModal';

import { useDeleteBoardMutation, useUpdateBoardMutation } from 'store/services/boardsApi';

import { ExistBoardProps } from './types';
import { addBoardRequest } from 'store/services/types/boards';

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
  const { t } = useTranslation();
  const [deleteBoard] = useDeleteBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const handleModal = () => setIsModal(!isModal);
  const handleDeleteModal = () => setIsDeleteModal(!isDeleteModal);

  const handleBoardPage = ({ target }: React.MouseEvent<HTMLDivElement>) => {
    if (target instanceof HTMLDivElement) {
      if (target.className.includes('ExistBoard')) {
        console.log(`go to ${id}`);
      }
    }
  };

  const handleBoardEdit = async (data: addBoardRequest) => {
    const dataRequest = { id, body: data };
    try {
      const response = await updateBoard(dataRequest).unwrap();
      if (response.id) {
        toast.success(t('toastContent.editBoard'));
      } else {
        throw new Error();
      }
    } catch {
      toast.error(t('toastContent.serverError'));
    }
  };

  const handleBoardDelete = async () => {
    try {
      await deleteBoard(id).unwrap();
      toast.success(t('toastContent.deleteBoard'));
    } catch {
      toast.error(t('toastContent.serverError'));
    }
  };

  return (
    <>
      {isModal && (
        <CreateEditModal
          title={t('editBoard.title')}
          editValues={{ name, description }}
          description={true}
          handler={handleBoardEdit}
          closeHandler={handleModal}
        />
      )}
      {isDeleteModal && (
        <DeleteModal handler={handleBoardDelete} closeHandler={handleDeleteModal} />
      )}
      <section className={boardSection} onClick={handleBoardPage}>
        <MainPaper>
          <div className={boardContentWrapper}>
            <header className={boardHeader}>
              <p className={boardTitle}>{name}</p>
              <div className={boardButtonWrapper}>
                <button className="icon-board-edit" onClick={handleModal}></button>
                <button className="icon-board-column-remove" onClick={handleDeleteModal}></button>
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
