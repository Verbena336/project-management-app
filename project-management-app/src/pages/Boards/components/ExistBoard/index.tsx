import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import MainPaper from 'components/MainPaper';
import CreateEditModal from 'components/Modals/CreateEditModal';
import DeleteModal from 'components/Modals/DeleteModal';

import { useDeleteBoardMutation, useUpdateBoardMutation } from 'store/services/boardsApi';

import { ExistBoardProps } from './types';
import { addBoardRequest } from 'store/services/types/boards';

import styles from './index.module.scss';
import { PATH, TError } from 'types';
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
  const navigate = useNavigate();

  const handleBoardPage = ({ target }: React.MouseEvent<HTMLDivElement>) => {
    if (!(target instanceof HTMLButtonElement)) {
      navigate(`${PATH.BOARDS}/${id}`);
    }
  };

  const handleBoardEdit = async (data: addBoardRequest) => {
    const dataRequest = { id, body: { ...data, sharedWith: [] } };
    try {
      const response = await updateBoard(dataRequest).unwrap();
      if (!response.id) {
        throw new Error();
      }
    } catch (err) {
      const error = err as TError;
      switch (error.status || error.data.statusCode) {
        case 401:
          toast.error(t('toastContent.unauthorized'));
          localStorage.removeItem('KanBanToken');
          localStorage.removeItem('KanBanLogin');
          localStorage.removeItem('KanBanId');
          navigate(PATH.WELCOME);
          break;
        default:
          toast.error(t('toastContent.serverError'));
      }
    }
  };

  const handleBoardDelete = async () => {
    try {
      await deleteBoard(id).unwrap();
    } catch (err) {
      const error = err as TError;
      switch (error.status || error.data.statusCode) {
        case 401:
          toast.error(t('toastContent.unauthorized'));
          localStorage.removeItem('KanBanToken');
          localStorage.removeItem('KanBanLogin');
          localStorage.removeItem('KanBanId');
          navigate(PATH.WELCOME);
          break;
        default:
          toast.error(t('toastContent.serverError'));
      }
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
                <button className="icon-board-remove" onClick={handleDeleteModal}></button>
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
