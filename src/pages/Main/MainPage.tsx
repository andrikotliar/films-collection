import { Sidebar, FilmsList } from './components';
import { setBrowserTitle } from '@/heplers';
import './main-page.css';

const Main = () => {
  setBrowserTitle('Films Collection');

  return (
    <div className="main">
      <div className="container main__container">
        <Sidebar />
        <FilmsList />
      </div>
    </div>
  );
};

export default Main;