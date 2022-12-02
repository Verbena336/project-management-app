import React from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Spinner from '@mui/material/CircularProgress';
import AppLayout from 'components/AppLayout';
import ExistBoard from './components/ExistBoard';
import NewBoardOrColumn from '../../components/NewBoardOrColumn';

import { useGetAllBoardsQuery, useAddBoardMutation } from 'store/services/boardsApi';

import { addBoardRequest } from 'store/services/types/boards';

import styles from './index.module.scss';
import { PATH, TError } from 'types';

const { boardsWrapper, loading } = styles;

const Boards = () => {
  const { t } = useTranslation();
  const { data } = useGetAllBoardsQuery();
  const [addBoard] = useAddBoardMutation();
  const navigate = useNavigate();

  const handleNewBoard = async (data: addBoardRequest) => {
    try {
      const response = await addBoard(data).unwrap();
      if (!response.id) {
        throw new Error();
      }
    } catch (err) {
      const error = err as TError;
      switch (error.status || error.statusCode) {
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
    <AppLayout>
      {!data ? (
        <div className={loading}>
          <Spinner color="inherit" />
        </div>
      ) : (
        <>
          <div className={boardsWrapper}>
            {data.map(({ id, title, description }) => (
              <ExistBoard key={id} id={id} name={title} description={description} />
            ))}
            <NewBoardOrColumn
              modalTitle={t('createBoard.title')}
              iconClass="icon-add-board"
              handleNewItem={handleNewBoard}
            />
          </div>
        </>
      )}
    </AppLayout>
  );
};

export default Boards;
