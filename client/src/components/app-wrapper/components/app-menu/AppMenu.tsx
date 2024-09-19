import { Menu } from '@/components/menu/Menu';
import { mainMenu } from '@/configs';
import styles from './AppMenu.module.css';
import classNames from 'classnames';
import { FC, RefObject, useMemo, useRef } from 'react';
import { useClickOutside, useCloseOnScroll } from '@/hooks';
import { LocalStorageKey } from '@/enums';
import { FilmData } from '@/types';
import { AppMenuFilmsList } from '../app-menu-films-list/AppMenuFilmsList';

type AppMenuProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  menuButtonRef: RefObject<HTMLButtonElement>;
};

const AppMenu: FC<AppMenuProps> = ({ isOpen, onClose, menuButtonRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastVisitedFilmsStorage = localStorage.getItem(
    LocalStorageKey.LAST_VISITED_FILMS,
  );

  useClickOutside({
    isOpen,
    closeHandler: onClose,
    triggerElementRef: menuButtonRef,
    containerRef,
  });

  useCloseOnScroll(onClose);

  const lastVisitedFilms = useMemo(() => {
    if (!lastVisitedFilmsStorage) {
      return [];
    }

    const parsedFilms: Pick<FilmData, '_id' | 'title'>[] = JSON.parse(
      lastVisitedFilmsStorage,
    );

    return parsedFilms;
  }, [lastVisitedFilmsStorage]);

  const todayReleasedMovies = useMemo(() => {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();

    // const filteredFilms = films.filter((film) => {
    //   const filmReleasedDate = new Date(film.releaseDate[0]);
    //   const date = filmReleasedDate.getDate();
    //   const month = filmReleasedDate.getMonth();

    //   return date === todayDate && todayMonth === month;
    // });

    return [];
  }, []);

  return (
    <div
      className={classNames(styles.appMenu, {
        [styles.openAppMenu]: isOpen,
      })}
      ref={containerRef}
    >
      <Menu config={mainMenu} />
      {Boolean(lastVisitedFilms.length) && (
        <AppMenuFilmsList list={lastVisitedFilms} title="Last visited titles" />
      )}
      {Boolean(todayReleasedMovies.length) && (
        <AppMenuFilmsList
          list={todayReleasedMovies}
          title="Released in this date"
        />
      )}
    </div>
  );
};

export { AppMenu };
