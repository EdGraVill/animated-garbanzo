import type { FC } from 'react';
import { BinTreeNode } from './util';

interface Props {
  tree: BinTreeNode;
}

const Node: FC<Props> = ({ tree }) => (
  <div className="output__node">
    <span className="output__id">{tree.id}</span>
    {(tree.left || tree.right) && (
      <div className="output__branches">
        {tree.left ? <Node tree={tree.left} /> : <div className="output__node output__node--empty" />}
        {tree.right ? <Node tree={tree.right} /> : <div className="output__node output__node--empty" />}
      </div>
    )}
  </div>
);

const Output: FC<Props> = ({ tree }) => (
  <div className="output__container">
    <span className="output__title">Output</span>
    <div className="output__tree">
      <Node tree={tree} />
    </div>
  </div>
);

export default Output;
