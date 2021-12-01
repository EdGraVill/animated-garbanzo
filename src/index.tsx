import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.scss';
import './prism-vsc-dark-plus.css';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
