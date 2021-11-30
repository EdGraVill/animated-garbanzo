import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { arrayToBinTreeNode } from '../util';
import type { BinTreeNode, InputArray } from '../util';

export const getTreeInitialState = () => ({
  error: null as string | null,
  fileName: null as string | null,
  tree: null as BinTreeNode | null,
  originalTree: null as BinTreeNode | null,
});

export const { actions: treeActions, name: treeReducerName, reducer: treeReducer } = createSlice({
  initialState: getTreeInitialState(),
  name: 'tree',
  reducers: {
    loadTree(state, { payload: { data, fileName } }: PayloadAction<{ data: string; fileName: string }>) {
      try {
        const input: InputArray = JSON.parse(data);

        const tree = arrayToBinTreeNode(input);

        if (!tree) {
          state.error = `Unable to load content from ${fileName}`;
        } else {
          state.error = null;
          state.fileName = fileName;
          state.tree = tree;
          state.originalTree = tree;
        }
      } catch (error) {
        state.error = `Unable to load content from ${fileName}`;
      }
    },
    setTree(state, { payload }: PayloadAction<BinTreeNode>) {
      state.tree = payload;
    },
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    clearTree: getTreeInitialState,
  },
});
