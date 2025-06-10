import { configureStore } from '@reduxjs/toolkit';
import { requestsApi } from './api/requestsApi';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
    reducer: {
        [requestsApi.reducerPath]: requestsApi.reducer,
        filters: filtersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(requestsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;