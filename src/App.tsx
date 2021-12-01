import { useMemo } from 'react';
import type { FC } from 'react';
import InputFile from './InputFile';
import { loadStore } from './store';
import { Provider } from 'react-redux';
import Preview from './Preview';

const App: FC = () => {
  const store = useMemo(() => loadStore(), []);

  return (
    <Provider store={store}>
      <div className="App">
        <InputFile />
        <Preview />
      </div>
    </Provider>
  );
};

export default App;
