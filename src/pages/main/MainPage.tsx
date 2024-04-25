import { useDataContext } from '@/context';
import styles from './MainPage.module.css';
import { Sidebar, FilmsSection } from './components';
import { useDocumentTitle } from '@/hooks';

const MainPage = () => {
  useDocumentTitle();

  return (
    <div className={styles.main}>
      <Sidebar />
      <FilmsSection />
    </div>
  );
};

export default MainPage;
