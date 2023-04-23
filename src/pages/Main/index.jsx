import { Sidebar, FilmsList } from '@/components';
import { setBrowserTitle } from '@/heplers';
import './styles.css';

const Main = () => {
  setBrowserTitle('Films Collection');

  return (
    <div className="main">
      <Sidebar />
      <FilmsList />
    </div>
  );
};

export default Main;
