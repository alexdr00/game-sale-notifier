import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app'),
);

module.hot.accept();
