import { Container } from '@/components';
import classes from './MainPage.module.css';
import { Sidebar, FilmsGrid } from './components';
import { useDocumentTitle } from '@/hooks';

const MainPage = () => {
  useDocumentTitle();

  return (
    <div className={classes.main}>
      <Container className={classes.wrapper}>
        <Sidebar />
        <FilmsGrid />
      </Container>
    </div>
  );
};

export default MainPage;
