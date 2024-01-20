import classes from './MainPage.module.css';
import { Sidebar, FilmsGrid } from './components';
import { useDocumentTitle } from '@/hooks';

const MainPage = () => {
  useDocumentTitle();

  return (
    <div className={classes.main}>
      <Sidebar />
      <FilmsGrid />
    </div>
  );
};

export default MainPage;
