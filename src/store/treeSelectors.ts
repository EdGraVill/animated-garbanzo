import { createSelector } from '@reduxjs/toolkit';
import type { StoreState } from './loadStore';
import { treeReducerName } from './treeSlicer';

export const treeRootStateSelector = (state: StoreState) => state[treeReducerName];

export const treeSelector = createSelector(
  treeRootStateSelector,
  (tree) => tree.tree,
);

export const treeErrorSelector = createSelector(
  treeRootStateSelector,
  (tree) => tree.error,
);

export const treeFileNameSelector = createSelector(
  treeRootStateSelector,
  (tree) => tree.fileName,
);
