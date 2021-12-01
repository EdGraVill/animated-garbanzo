import { useCallback, useEffect, useState } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';
import { BinTreeNode } from './util';
import cn from 'classnames';

interface NodeProps {
  hoveredElement: string | null;
  latestPath: string;
  path: string;
  setHovered: Dispatch<SetStateAction<string | null>>;
  setLatestPath: Dispatch<SetStateAction<string>>;
  tree?: BinTreeNode | null;
}

const Node: FC<NodeProps> = ({ hoveredElement, latestPath, path, setHovered, setLatestPath, tree }) => {
  useEffect(() => {
    if (tree && path.split('-').length > latestPath.split('-').length) {
      setLatestPath(path);
    }
  }, [setLatestPath, path, latestPath, tree]);

  const onMouseEnter = useCallback(() => {
    setHovered(path);
  }, [setHovered, path]);

  const onMouseLeave = useCallback(() => {
    if (path === 'root') {
      setHovered(null);
    } else {
      const parentPath = path.split('-').slice(0, -1).join('-');
      setHovered(parentPath);
    }
  }, [setHovered, path]);

  return (
    <div
      className={cn({
        'output__node': true,
        'output__node--empty': !tree,
        'output__node--hovered': hoveredElement && path.includes(hoveredElement || ''),
        'output__node--latest': latestPath === path,
      })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {tree && (
        <>
          <span className="output__id">{tree.id}</span>
          {(tree.left || tree.right) && (
            <div className="output__branches">
              {(['left', 'right'] as const).map((branchName) => (
                <Node
                  hoveredElement={hoveredElement}
                  latestPath={latestPath}
                  path={`${path}-${branchName}`}
                  setHovered={setHovered}
                  setLatestPath={setLatestPath}
                  tree={tree[branchName]}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

interface OutputProps {
  tree: BinTreeNode;
}

const Output: FC<OutputProps> = ({ tree }) => {
  const [hoveredElement, setHovered] = useState<string | null>(null);
  const [latestPath, setLatestPath] = useState<string>('root');

  useEffect(() => {
    if (latestPath !== 'root') {
      setLatestPath('root');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tree])

  return (
    <div className="output__container">
      <span className="output__title">Output</span>
      <div className="output__tree" onMouseLeave={() => setHovered(null)}>
        <Node
          hoveredElement={hoveredElement}
          latestPath={latestPath}
          path="root"
          setHovered={setHovered}
          setLatestPath={setLatestPath}
          tree={tree}
        />
      </div>
    </div>
  );
};

export default Output;
