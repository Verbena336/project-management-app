import { configureStore } from '@reduxjs/toolkit';

import { authApi } from 'store/services/authApi';
import { boardsApi } from './services/boardsApi';
import { columnsApi } from './services/columnsApi';
import { tasksApi } from './services/tasksApi';
import authReducer from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [columnsApi.reducerPath]: columnsApi.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(tasksApi.middleware)
      .concat(columnsApi.middleware)
      .concat(boardsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
