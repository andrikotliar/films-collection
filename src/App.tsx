import { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppWrapper, Navigation, Loader } from './components';
import { FilmPage, MainPage, AboutPage, StatisticPage } from './pages';
import { globalMenu } from '@/configs';

const App = () => {
  const location = useLocation();

  return (
    <AppWrapper>
      <Navigation
        links={globalMenu}
        checkIsActive={(link) => link === location.pathname}
      />
      <Suspense fallback={<Loader isFullPage />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/film/:id" element={<FilmPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/stats" element={<StatisticPage />} />
        </Routes>
      </Suspense>
    </AppWrapper>
  );
};

export default App;
