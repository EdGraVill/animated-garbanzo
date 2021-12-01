import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-json';
import CodeEditor from 'react-simple-code-editor';
import { useCallback, useEffect } from 'react';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { treeActions } from './store';
import { useDebouncedState } from './hooks';
import type { BinTreeNode } from './util';

interface Props {
  tree: BinTreeNode;
}

const Editor: FC<Props> = ({ tree }) => {
  const dispatch = useDispatch();
  const setTree = useCallback((newTree: BinTreeNode) => dispatch(treeActions.setTree(newTree)), [dispatch]);
  const setError = useCallback((error) => dispatch(treeActions.setError(error)), [dispatch]);
  const clearError = useCallback(() => dispatch(treeActions.clearError()), [dispatch]);
  const [code, debouncedCode, setCode] = useDebouncedState(JSON.stringify(tree, undefined, 2));

  useEffect(() => {
    try {
      const newTree: BinTreeNode = JSON.parse(debouncedCode);
      clearError();
      setTree(newTree);
    } catch (error) {
      setError('Invalid JSON');
    }
  }, [debouncedCode, setTree, setError, clearError]);

  return (
    <div>
      <span className="editor__title">Editor</span>
      <pre className="language-json">
        <code className="language-json">
          <CodeEditor
            highlight={code => highlight(code, languages.json, 'json')}
            onValueChange={setCode}
            value={code}
          />
        </code>
      </pre>
    </div>
  )
};

export default Editor;
