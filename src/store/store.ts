import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { loggerMiddleware } from './middleware';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(loggerMiddleware),
    devTools: import.meta.env.DEV,
});

// Types
export type AppDispatch = typeof store.dispatch;
