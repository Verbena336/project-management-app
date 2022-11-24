import { configureStore } from '@reduxjs/toolkit';

import { commonApi } from './services/commonApi';
import authReducer from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    [commonApi.reducerPath]: commonApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
