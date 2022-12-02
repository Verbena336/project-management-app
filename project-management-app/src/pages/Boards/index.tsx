import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Spinner from '@mui/material/CircularProgress';
import AppLayout from 'components/AppLayout';
import ExistBoard from './components/ExistBoard';
import NewBoardOrColumn from '../../components/NewBoardOrColumn';
import BoardColumnFilter from 'components/BoardColumnFilter';

import { useGetAllBoardsQuery, useAddBoardMutation } from 'store/services/boardsApi';

import { addBoardRequest, getAllBoardsResponse } from 'store/services/types/boards';

import styles from './index.module.scss';

const { boardsWrapper } = styles;

const Boards = () => {
  const { t } = useTranslation();
  const { data } = useGetAllBoardsQuery();
  const [addBoard] = useAddBoardMutation();
  const [boards, setBoards] = useState<getAllBoardsResponse>([]);

  useEffect(() => {
    data && setBoards(data);
  }, [data]);

  const handleNewBoard = async (data: addBoardRequest) => {
    try {
      const response = await addBoard(data).unwrap();
      if (response.id) {
        toast.success(t('toastContent.addBoard'));
      } else {
        throw new Error();
      }
    } catch {
      toast.error(t('toastContent.serverError'));
    }
  };

  return (
    <AppLayout>
      <BoardColumnFilter
        title={t('BoardColumnFilter.boardTitle')}
        data={data}
        handleData={setBoards}
      />
      <div className={boardsWrapper}>
        {!data ? (
          <Spinner color="inherit" />
        ) : (
          <>
            {boards.map(({ id, title, description }) => (
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
