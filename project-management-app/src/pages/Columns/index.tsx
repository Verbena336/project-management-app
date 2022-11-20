import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Spinner from '@mui/material/CircularProgress';

import AppLayout from 'components/AppLayout';

import Column from './components/Column';
import NewBoardOrColumn from 'components/NewBoardOrColumn';

import { useAddColumnMutation } from 'store/services/columnsApi';
import { useGetColumnsQuery } from 'store/services/columnsApi';

import styles from './index.module.scss';

import { CreateRequest, PATH } from 'types';

const { BOARDS } = PATH;
const { inner, content } = styles;

const Columns = () => {
  const boardId = '1834c731-0672-4ecf-8345-e43808d4c8ac';
  const { t } = useTranslation();
  const [addColumn] = useAddColumnMutation();
  const { data, isLoading } = useGetColumnsQuery(boardId);

  const createColumn = async ({ title }: CreateRequest) => {
    try {
      const { id } = await addColumn({ boardId, title }).unwrap();
      id && toast.success(t('toastContent.addBoard'));
    } catch {
      toast.error(t('toastContent.serverError'));
    }
  };

  return (
    <AppLayout>
      <div className="container">
        <div className={inner}>
          <NavLink to={BOARDS} className="icon-back-arrow">
            Название доски
          </NavLink>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className={content}>
              {data?.map((data, i) => (
                <Column key={i} boardId={boardId} data={data} />
              ))}
              <NewBoardOrColumn
                modalTitle={t('createBoard.title')}
                iconClass="icon-add-column"
                handleNewItem={createColumn}
              />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Columns;
