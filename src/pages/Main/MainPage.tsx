import { Container } from '@/components';
import classes from './MainPage.module.css';
import { Sidebar, FilmsList } from './components';
import { setBrowserTitle } from '@/helpers';

const MainPage = () => {
  setBrowserTitle('Films Collection');

  return (
    <div className={classes.main}>
      <Container className={classes.wrapper}>
        <Sidebar />
        <FilmsList />
      </Container>
    </div>
  );
};

export default MainPage;
