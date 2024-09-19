import styles from './MainPage.module.css';
import { Sidebar, FilmsSection } from './components';
import { useDocumentTitle } from '@/hooks';
import { SidebarProvider } from './context';

const RootPage = () => {
  useDocumentTitle();

  return (
    <div className={styles.main}>
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
      <FilmsSection />
    </div>
  );
};

export default RootPage;
