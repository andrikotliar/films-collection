import { useFilmsContext } from '@/context';
import styles from './MainPage.module.css';
import { Sidebar, FilmsSection } from './components';
import { useDocumentTitle } from '@/hooks';
import { Loader } from '@/components';

const MainPage = () => {
  useDocumentTitle();

  const { isFilmsFetching } = useFilmsContext();

  if (isFilmsFetching) {
    return <Loader isFullPage />;
  }

  return (
    <div className={styles.main}>
      <Sidebar />
      <FilmsSection />
    </div>
  );
};

export default MainPage;
