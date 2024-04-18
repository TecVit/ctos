import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import './framework.scss';
import Rotas from './Rotas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Rotas />
  </React.StrictMode>
);