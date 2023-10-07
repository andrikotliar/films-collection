import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Loader } from './components';
import { FilmPage, MainPage, AboutPage } from './pages';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/film/:id" element={<FilmPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;