import { configureStore, combineReducers } from '@reduxjs/toolkit'
import type { StateFromReducersMapObject } from '@reduxjs/toolkit'
import { treeReducer, treeReducerName } from './treeSlicer'

export const reducersMap = {
  [treeReducerName]: treeReducer,
}

export type StoreState = StateFromReducersMapObject<typeof reducersMap>;

export const loadStore = () => {  
  const store = configureStore({
    reducer: combineReducers(reducersMap),
  });

  return store;
}
