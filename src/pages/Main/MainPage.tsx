import { Container } from '@/components';
import classes from './MainPage.module.css';
import { Sidebar, FilmsList } from './components';
import { setBrowserTitle } from '@/helpers';
import { useEffect } from 'react';
import { useFilmsContext } from '@/context';
import { FILMS_COUNT_STEP } from '@/common';

const MainPage = () => {
  const {
    filmsCount,
    loadedFilmsNumber,
    setLoadedFilmsNumber,
  } = useFilmsContext();

  setBrowserTitle('Films Collection');

  const updateLoadedFilmsNumber = () => {
    const target = document.documentElement;
    const isScrolledToEnd =
      target.scrollHeight - target.scrollTop ===
      target.clientHeight;

    if (
      isScrolledToEnd &&
      loadedFilmsNumber <= filmsCount
    ) {
      setLoadedFilmsNumber((num) => num + FILMS_COUNT_STEP);
    }
  };

  useEffect(() => {
    document.addEventListener(
      'scroll',
      updateLoadedFilmsNumber,
    );

    return () => {
      document.removeEventListener(
        'scroll',
        updateLoadedFilmsNumber,
      );
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
