import { configureStore } from '@reduxjs/toolkit'
// eslint-disable-next-line import/named
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { listReducer } from './listSlices'

const store = configureStore({
  reducer: {
    list: listReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDisPatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
