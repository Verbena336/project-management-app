import React from 'react';
import { NavLink } from 'react-router-dom';

import Spinner from '@mui/material/CircularProgress';

import AppLayout from 'components/AppLayout';

import Column from './components/Column';
import AddColumnBtn from './components/AddColumnBtn';

import { useGetColumnsQuery } from 'store/services/columnsApi';

import styles from './index.module.scss';

import { PATH } from 'types';
import { Props } from './types';

const { BOARDS } = PATH;
const { inner, content } = styles;

const Columns = ({ id }: Props) => {
  const { data, isLoading } = useGetColumnsQuery(id || '1834c731-0672-4ecf-8345-e43808d4c8ac');
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
                <Column key={i} />
              ))}
              <AddColumnBtn boardId={'1834c731-0672-4ecf-8345-e43808d4c8ac'} />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Columns;
