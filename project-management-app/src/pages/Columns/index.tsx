import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Spinner from '@mui/material/CircularProgress';

import AppLayout from 'components/AppLayout';

import Column from './components/Column';
import NewBoardOrColumn from 'components/NewBoardOrColumn';

import { useGetColumnsQuery, useAddColumnMutation } from 'store/services/columnsApi';

import styles from './index.module.scss';

import { CreateRequest, PATH } from 'types';
import { sortOrder } from 'helpers/sortOrder';

const { BOARDS } = PATH;
const { inner, content } = styles;

const Columns = () => {
  const { boardId } = useParams();
  const { t } = useTranslation();
  const [addColumn] = useAddColumnMutation();
  const { data, isLoading } = useGetColumnsQuery(boardId!);

  const createColumn = async ({ title }: CreateRequest) => {
    try {
      const { id } = await addColumn({ boardId: boardId!, body: { title } }).unwrap();
      if (id) {
        toast.success(t('toastContent.addColumn'));
      } else {
        throw new Error();
      }
    } catch {
      toast.error(t('toastContent.serverError'));
    }
  };

  return (
    <AppLayout>
      <div className="container">
        <div className={inner}>
          <NavLink to={BOARDS} className="icon-back-arrow">
            {t('columns.backLink')}
          </NavLink>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className={content}>
              {sortOrder(data!).map((data) => {
                return <Column key={data.id} boardId={boardId!} data={data} />;
              })}
              <NewBoardOrColumn
                modalTitle={t('createColumn.title')}
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
