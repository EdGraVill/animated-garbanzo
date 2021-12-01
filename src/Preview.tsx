import cn from 'classnames';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { isTreeModifiedSelector, treeErrorSelector, treeFileNameSelector, treeSelector } from './store';
import Editor from './Editor';
import Output from './Output';

const Preview: FC = () => {
  const tree = useSelector(treeSelector);
  const error = useSelector(treeErrorSelector);
  const fileName = useSelector(treeFileNameSelector);
  const isTreeModified = useSelector(isTreeModifiedSelector);

  return (
    <>
      <span className="preview__title">
        Editing <span className="preview__title--fileName">"{fileName}"</span> {isTreeModified && (
          <span className="preview__title--modified">(Modified)</span>
        )}
      </span>
      <div className={cn(['preview__container', { 'preview__container--error': error }])}>
        {error && (
          <div className="preview__error">{error}</div>
        )}
        {tree ? (
          <div className="preview__content">
            <Editor tree={tree} />
            <Output tree={tree} />
          </div>
        ) : (
          <p className="preview__noTree">
            Please, select a file and on "Fetch" button to load the content
          </p>
        )}
      </div>
    </>
  )
};

export default Preview;
