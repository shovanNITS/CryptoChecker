import { configureStore } from '@reduxjs/toolkit'
import { cryptoApi } from '../services/cryptoApi'
// Remove NewsApi import
// import { NewsApi } from '../services/newsApi';

export const store = configureStore({
  reducer: {
      [cryptoApi.reducerPath]: cryptoApi.reducer,
      // Remove NewsApi from reducers
      // [NewsApi.reducerPath]: NewsApi.reducer,
  },
});