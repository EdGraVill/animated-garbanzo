export type IdType = string | number;

export type InputArray = [id: IdType, left?: InputArray | null, right?: InputArray | null];

export interface BinTreeNode {
  id: IdType;
  left?: BinTreeNode | null;
  right?: BinTreeNode | null;
}

export function arrayToBinTreeNode(arr: InputArray | null): BinTreeNode | null {
  // If is evaluating a null value or an invalid input will return null, in order to make it resilient
  if (arr === null || !(arr instanceof Array) || arr.length < 1) {
    return null;
  }

  const tree: BinTreeNode = {
    id: arr[0],
    ...(typeof arr[1] !== 'undefined' ? { left: arrayToBinTreeNode(arr[1]) } : {}),
    ...(typeof arr[2] !== 'undefined' ? { right: arrayToBinTreeNode(arr[2]) } : {}),
  };

  return tree;
}
