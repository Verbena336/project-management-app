import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import AppLayout from 'components/AppLayout';
import ExistBoard from './components/ExistBoard';
import NewBoardOrColumn from '../../components/NewBoardOrColumn';
import BoardColumnFilter from 'components/BoardColumnFilter';
import Loader from 'components/Loading/components/Loader';

import { useGetAllBoardsQuery, useAddBoardMutation } from 'store/services/boardsApi';

import { addBoardRequest, getAllBoardsResponse } from 'store/services/types/boards';

import styles from './index.module.scss';
import { PATH, TError } from 'types';

const { boardsWrapper, loading } = styles;

const Boards = () => {
  const { t } = useTranslation();
  const { data, isError } = useGetAllBoardsQuery();
  const [addBoard] = useAddBoardMutation();
  const [boards, setBoards] = useState<getAllBoardsResponse>([]);
  const [searchError, setSearchError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    data && setBoards(data);
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error(t('toastContent.serverError'));
    }
  }, [isError, t]);

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

  const searchSubmitHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value.toLowerCase();
    if (searchError) setSearchError(false);

    if (!data) return;
    if (!value && data) return setBoards(data);

    const result = data.filter((item) => item.title.toLowerCase().includes(value));
    if (data.length && !result.length) {
      setSearchError(true);
    }

    setBoards(result);
  };

  return (
    <AppLayout>
      {!data ? (
        <div className={loading}>
          <Loader />
        </div>
      ) : (
        <>
          <BoardColumnFilter
            title={t('BoardColumnFilter.boardTitle')}
            error={searchError}
            submitHandler={searchSubmitHandler}
            disable={!data.length}
          />
          <div className={boardsWrapper}>
            {boards.map(({ id, title, description }) => (
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
