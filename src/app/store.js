import { configureStore } from '@reduxjs/toolkit'
import { cryptoApi } from '../services/cryptoApi'
import { NewsApi } from '../services/newsApi';

export const store = configureStore({
  reducer: {
      [cryptoApi.reducerPath]: cryptoApi.reducer,
      [NewsApi.reducerPath]: NewsApi.reducer,
  },
});