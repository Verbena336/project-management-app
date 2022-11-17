import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Spiner from '@mui/material/CircularProgress';
import AppLayout from 'components/AppLayout';
import ExistBoard from './components/ExistBoard';
import NewBoardOrColumn from '../../components/NewBoardOrColumn';

import { useGetAllBoardsQuery, useAddBoardMutation } from 'store/services/boardsApi';

import { PATH } from 'components/AppRoutes/types';
import { addBoardRequest } from 'store/services/types/boards';

import styles from './index.module.scss';

const { boardsWrapper } = styles;

const Boards = () => {
  const { t } = useTranslation();
  const { data } = useGetAllBoardsQuery();
  const [addBoard] = useAddBoardMutation();

  if (!localStorage.getItem('KanBanToken')) return <Navigate to={PATH.WELCOME} />;

  const handleNewBoard = async (data: Record<string, string>) => {
    try {
      const response = await addBoard(data as addBoardRequest).unwrap();
      if (response.id) {
        toast.success(`The board is added!`);
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Something is wrong with the server!');
    }
  };

  return (
    <AppLayout>
      <div className={boardsWrapper}>
        {!data ? (
          <Spiner color="inherit" />
        ) : (
          <>
            {data.map(({ id, title, description }) => (
              <ExistBoard key={id} id={id} name={title} description={description} />
            ))}
            <NewBoardOrColumn
              modalTitle={t('createBoard.title')}
              iconClass="icon-add-board"
              handleNewItem={handleNewBoard}
            />
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Boards;
