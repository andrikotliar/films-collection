import './global.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ActorsProvider, FilmsProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FilmsProvider>
        <ActorsProvider>
          <App />
        </ActorsProvider>
      </FilmsProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
