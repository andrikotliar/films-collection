import styles from './root.module.css';
import { Sidebar, FilmsSection } from './components';
import { useDocumentTitle } from '@/hooks';
import { FilmsListProvider, SidebarProvider } from './context';

const RootPage = () => {
  useDocumentTitle();

  return (
    <FilmsListProvider>
      <div className={styles.main}>
        <SidebarProvider>
          <Sidebar />
        </SidebarProvider>
        <FilmsSection />
      </div>
    </FilmsListProvider>
  );
};

export default RootPage;
