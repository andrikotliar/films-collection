import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppWrapper, Loader } from './components';
import {
  RootPage,
  FilmPage,
  AboutPage,
  StatisticPage,
  NotFoundPage,
} from './pages';

const App = () => {
  return (
    <AppWrapper>
      <Suspense fallback={<Loader isFullPage />}>
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/film/:id" element={<FilmPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/stats" element={<StatisticPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AppWrapper>
  );
};

export default App;
