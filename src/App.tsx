import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { FilmPage, MainPage, InfoPage } from './pages';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/film/:id" element={<FilmPage />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </div>
  );
};

export default App;