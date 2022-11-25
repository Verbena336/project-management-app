import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import Spinner from '@mui/material/CircularProgress';

import AppLayout from 'components/AppLayout';
import Column from './components/Column';
import NewBoardOrColumn from 'components/NewBoardOrColumn';

import { useAddColumnMutation, useUpdateColumnMutation } from 'store/services/columnsApi';
import { useUpdateTaskMutation } from 'store/services/tasksApi';
import { useGetBoardQuery } from 'store/services/boardsApi';

import styles from './index.module.scss';

import { CreateRequest, PATH } from 'types';
import { TColumn } from 'store/services/types/columns';

const { BOARDS } = PATH;
const { inner, content } = styles;

const Columns = () => {
  const { boardId } = useParams();
  const { t } = useTranslation();
  const [addColumn] = useAddColumnMutation();
  const [columns, setColumns] = useState<TColumn[]>([]);
  const { data, isLoading } = useGetBoardQuery(boardId!);
  const [updateTask] = useUpdateTaskMutation();
  const [updateColumn] = useUpdateColumnMutation();

  useEffect(() => {
    data && setColumns(data.columns);
  }, [data]);

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

      await updateColumn({
        boardId: boardId!,
        columnId: currentColumn!.id,
        body: {
          title: currentColumn!.title,
          order: destination.index + 1,
        },
      });
      return;
    }

    const task = columns
      .find((column) => column.id === source.droppableId)
      ?.tasks.find((task) => task.id === draggableId);

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
    await updateTask({
      boardId: boardId!,
      columnId: source.droppableId,
      taskId: draggableId,
      body,
    });
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
            <div style={{ overflow: 'hidden' }}>
              <DragDropContext onDragEnd={dragEndEvent}>
                <Droppable droppableId="all-columns" direction="horizontal" type="columns">
                  {(provided) => (
                    <div className={content} {...provided.droppableProps} ref={provided.innerRef}>
                      {columns &&
                        [...columns]
                          .sort((a, b) => a.order - b.order)
                          .map((data, i) => {
                            return (
                              <Column key={data.id} boardId={boardId!} data={data} index={i} />
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
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Columns;
