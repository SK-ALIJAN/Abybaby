import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

// Add more feature reducers here
// import productReducer from '../features/product/productSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  // product: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
