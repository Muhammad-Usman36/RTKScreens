import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { cdkCrudApi } from './cdkCrud'

export const store = configureStore({
  reducer: {
    [cdkCrudApi.reducerPath]: cdkCrudApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cdkCrudApi.middleware),
})

setupListeners(store.dispatch)