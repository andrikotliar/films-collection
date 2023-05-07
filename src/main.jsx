import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import FilmsContext from './context/filmsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FilmsContext>
        <App />
      </FilmsContext>
    </BrowserRouter>
  </React.StrictMode>
)
