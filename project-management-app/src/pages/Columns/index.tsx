import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import Loader from 'components/Loading/components/Loader';

import AppLayout from 'components/AppLayout';
import Column from './components/Column';
import NewBoardOrColumn from 'components/NewBoardOrColumn';
import BoardColumnFilter from 'components/BoardColumnFilter';

import { useAddColumnMutation, useUpdateColumnMutation } from 'store/services/columnsApi';
import { useUpdateTaskMutation } from 'store/services/tasksApi';
import { useGetBoardQuery } from 'store/services/boardsApi';

import styles from './index.module.scss';

import { CreateRequest, PATH, TError } from 'types';
import { TColumn } from 'store/services/types/columns';

const { BOARDS } = PATH;
const { inner, wrapper, content, backLink, backTitle, arrow, loading, linkSearch, search } = styles;

const Columns = () => {
  const { boardId } = useParams();
  const { t } = useTranslation();
  const [addColumn] = useAddColumnMutation();
  const [columns, setColumns] = useState<TColumn[]>([]);
  const { data, isLoading, isError, error } = useGetBoardQuery(boardId!);
  const [updateTask] = useUpdateTaskMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const [searchError, setSearchError] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const searchSubmitHandler = useCallback(
    (e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let value: string;

      if (e) value = e.target.value;
      else value = searchValue.toLowerCase();

      setSearchValue(value);
      if (searchError) setSearchError(false);

      if (!data) return;
      if (!value && data) return setColumns(data.columns);

      const result = data.columns.filter((item) => item.title.toLowerCase().includes(value));
      if (data.columns.length && !result.length) {
        setSearchError(true);
      }

      setColumns(result);
    },
    [data, searchError, searchValue]
  );

  useEffect(() => {
    data && setColumns(data.columns);
    searchSubmitHandler();
  }, [data, searchSubmitHandler]);

  useEffect(() => {
    if (isError) {
      const err = error as TError;
      switch (err.status) {
        case 401:
          toast.error(t('toastContent.unauthorized'));
          localStorage.removeItem('KanBanToken');
          localStorage.removeItem('KanBanLogin');
          localStorage.removeItem('KanBanId');
          navigate(PATH.WELCOME);
          break;
        default:
          toast.error(t('toastContent.notBoard'));
          navigate(PATH.BOARDS);
      }
    }
  }, [isError, navigate, t, error]);

  const createColumn = async ({ title }: CreateRequest) => {
    try {
      const { id } = await addColumn({ boardId: boardId!, body: { title } }).unwrap();
      if (!id) {
        throw new Error();
      }
    } catch (err) {
      const errorLocal = err as TError;
      switch (errorLocal.status || errorLocal.statusCode) {
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

  const dragEndEvent = async ({ draggableId, destination, source, type }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'columns') {
      const columnsArr = Array.from(columns).sort((a, b) => a.order - b.order);
      const currentColumn = columns.find((column) => column.id === draggableId);

      const [spliceColumn] = columnsArr.splice(source.index, 1);
      columnsArr.splice(destination.index, 0, spliceColumn);
      const newColumnsArr = columnsArr.map((column, i) => ({ ...column, order: i + 1 }));

      setColumns(newColumnsArr);

      try {
        await updateColumn({
          boardId: boardId!,
          columnId: currentColumn!.id,
          body: {
            title: currentColumn!.title,
            order: destination.index + 1,
          },
        });
      } catch (err) {
        const errorLocal = err as TError;
        switch (errorLocal.status || errorLocal.statusCode) {
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
      return;
    }

    const task = columns
      .find((column) => column.id === source.droppableId)
      ?.tasks.find((task) => task.id === draggableId);
    try {
      if (!task) throw new Error();
    } catch {
      toast.error(t('toastContent.serverError'));
    }
    if (!task) return;

    const columnStart = columns.find((item) => item.id === source.droppableId);
    const columnFinish = columns.find((item) => item.id === destination.droppableId);

    if (columnStart?.id === columnFinish?.id) {
      const tasksArr = Array.from(columnStart!.tasks).sort((a, b) => a.order - b.order);
      const [removed] = tasksArr.splice(source.index, 1);
      tasksArr.splice(destination.index, 0, removed);

      const newColumn = {
        id: columnStart!.id,
        title: columnStart!.title,
        order: columnStart!.order,
        tasks: tasksArr.map((item, i) => ({ ...item, order: i + 1 })),
      };

      const resColumns = Array.from(columns);
      resColumns.splice(
        columns.findIndex((item) => item.id === columnStart?.id),
        1,
        newColumn as TColumn
      );
      setColumns(resColumns);
    } else {
      const tasksStartArr = Array.from(columnStart!.tasks).sort((a, b) => a.order - b.order);
      const tasksFinishArr = Array.from(columnFinish!.tasks).sort((a, b) => a.order - b.order);
      const [removed] = tasksStartArr.splice(source.index, 1);
      tasksFinishArr.splice(destination.index, 0, removed);

      const newStartColumn = {
        id: columnStart!.id,
        title: columnStart!.title,
        order: columnStart!.order,
        tasks: tasksStartArr.map((item, i) => ({ ...item, order: i + 1 })),
      };

      const newFinishColumn = {
        id: columnFinish!.id,
        title: columnFinish!.title,
        order: columnFinish!.order,
        tasks: tasksFinishArr.map((item, i) => ({ ...item, order: i + 1 })),
      };

      const resColumns = Array.from(columns);
      resColumns.splice(
        columns.findIndex((item) => item.id === columnStart?.id),
        1,
        newStartColumn as TColumn
      );
      resColumns.splice(
        columns.findIndex((item) => item.id === columnFinish?.id),
        1,
        newFinishColumn as TColumn
      );
      setColumns(resColumns);
    }

    const body = {
      title: task!.title,
      order: destination.index + 1,
      description: task!.description,
      columnId: destination.droppableId,
      boardId: boardId!,
      userId: task!.userId,
    };

    try {
      await updateTask({
        boardId: boardId!,
        columnId: source.droppableId,
        taskId: draggableId,
        body,
      }).unwrap();
    } catch (err) {
      const errorLocal = err as TError;
      switch (errorLocal.status || errorLocal.statusCode) {
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
      {isLoading ? (
        <div className={loading}>
          <Loader />
        </div>
      ) : (
        <div className="container">
          <div className={inner}>
            <div className={linkSearch}>
              <div className={backLink} onClick={() => navigate(BOARDS)}>
                <div className={`icon-back-arrow ${arrow}`}></div>
                <h3 className={backTitle}>{data?.title}</h3>
              </div>
              <BoardColumnFilter
                selector={search}
                title={t('BoardColumnFilter.columnTitle')}
                error={searchError}
                submitHandler={searchSubmitHandler}
                disable={!data?.columns.length}
              />
            </div>
            <div className={wrapper}>
              <DragDropContext onDragEnd={dragEndEvent}>
                <Droppable droppableId="all-columns" direction="horizontal" type="columns">
                  {(provided) => (
                    <div className={content} {...provided.droppableProps} ref={provided.innerRef}>
                      {columns &&
                        [...columns]
                          .sort((a, b) => a.order - b.order)
                          .map((data, i) => {
                            return (
                              <Column
                                key={data.id}
                                isDrag={!!searchValue}
                                boardId={boardId!}
                                data={data}
                                index={i}
                              />
                            );
                          })}
                      {provided.placeholder}
                      <NewBoardOrColumn
                        modalTitle={t('createColumn.title')}
                        iconClass="icon-add-column"
                        handleNewItem={createColumn}
                      />
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Columns;
