import { Container } from '@/components';
import classes from './MainPage.module.css';
import { Sidebar, FilmsList } from './components';
import { setBrowserTitle } from '@/helpers';
import { useEffect } from 'react';
import { useFilmsContext } from '@/context';
import { FILMS_COUNT_STEP } from '@/common';

const MainPage = () => {
  const { setLoadedFilmsNumber } = useFilmsContext();
  setBrowserTitle('Films Collection');

  const detectScroll = () => {
    if (
      window.innerHeight + Math.round(window.scrollY) >=
      document.body.offsetHeight
    ) {
      setLoadedFilmsNumber(num => num + FILMS_COUNT_STEP);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', detectScroll);

    return () => {
      document.removeEventListener('scroll', detectScroll);
    };
  }, []);

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
