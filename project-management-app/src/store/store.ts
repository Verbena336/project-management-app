import { configureStore } from '@reduxjs/toolkit';

import { authApi } from 'store/services/authApi';
import { tasksApi } from './services/tasksApi';
import { columnsApi } from './services/columnsApi';
import authReducer from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [columnsApi.reducerPath]: columnsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(tasksApi.middleware)
      .concat(columnsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
