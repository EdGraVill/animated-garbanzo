import cn from 'classnames';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { treeErrorSelector, treeSelector } from './store';
import Editor from './Editor';

const Preview: FC = () => {
  const tree = useSelector(treeSelector);
  const error = useSelector(treeErrorSelector);

  return (
    <div className={cn(['preview__container', { 'preview__container--error': error }])}>
      {error && (
        <div className="preview__error">{error}</div>
      )}
      {tree ? (
        <div className="preview__content">
          <Editor tree={tree} />
        </div>
      ) : (
        <div className="preview__container">
          <p className="preview__noTree">
            Please, select a file and on "Fetch" button to load the content
          </p>
        </div>
      )}
    </div>
  )
};

export default Preview;
