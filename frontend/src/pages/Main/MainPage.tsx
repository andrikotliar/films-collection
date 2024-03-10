import styles from './MainPage.module.css';
import { Sidebar, FilmsGrid } from './components';
import { useDocumentTitle } from '@/hooks';

const MainPage = () => {
  useDocumentTitle();

  return (
    <div className={styles.main}>
      <Sidebar />
      <FilmsGrid />
    </div>
  );
};

export default MainPage;
