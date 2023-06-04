import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppProvider from './context/AppContext';
import FilmProvider from './context/FilmsContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <FilmProvider>
          <App />
        </FilmProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
)
