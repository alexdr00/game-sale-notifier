import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import App from './js/App';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
