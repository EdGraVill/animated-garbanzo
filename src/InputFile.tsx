import cn from 'classnames';
import { useCallback, useState } from 'react';
import type { FC, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux';
import { treeActions } from './store';

const InputFile: FC = () => {
  const dispatch = useDispatch();
  const [selectedFile, setFile] = useState<File | null>(null);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFile(event.currentTarget.files.item(0))
    }
  }, [])
  
  const onFetch = useCallback(() => {
    if (selectedFile) {
      const reader = new FileReader();
  
      reader.onload = () => {
        dispatch(treeActions.loadTree({
          data: reader.result?.toString() || '',
          fileName: selectedFile.name,
        }));
      };
  
      reader.readAsText(selectedFile);
    }
  }, [selectedFile, dispatch])

  return (
    <label htmlFor="inputFile" className="inputFile__container">
      <span className="inputFile__label">
        Tree source
      </span>
      <div
        className={
          cn([
            'inputFile__fileName',
            { 'inputFile__fileName--placeholder': !selectedFile?.name },
          ])
        }
        dir="rtl"
      >
        {selectedFile?.name || 'Select File'}
      </div>
      <button className="inputFile__button" onClick={onFetch}>Fetch</button>
      <input className="inputFile__filePicker" id="inputFile" type="file" multiple={false} onChange={onChange} />
    </label>
  )
};

export default InputFile;
