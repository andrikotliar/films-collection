import { Menu } from '@/components/menu/Menu';
import { mainMenu } from '@/configs';
import styles from './AppMenu.module.css';
import classNames from 'classnames';
import { FC, RefObject, useContext, useMemo, useRef } from 'react';
import { useClickOutside, useCloseOnScroll } from '@/hooks';
import { LocalStorageKey } from '@/common/enums';
import { FilmsContext } from '@/context';
import { RouterLink } from '@/components/router-link/RouterLink';
import { buildRouterLink } from '@/helpers';
import { FilmData } from '@/common/types';

type AppMenuProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  menuButtonRef: RefObject<HTMLButtonElement>;
};

const AppMenu: FC<AppMenuProps> = ({ isOpen, onClose, menuButtonRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const savedFilmIds = localStorage.getItem(LocalStorageKey.LAST_VISITED_FILMS);
  const { films } = useContext(FilmsContext);

  useClickOutside({
    isOpen,
    closeHandler: onClose,
    triggerElementRef: menuButtonRef,
    containerRef,
  });

  useCloseOnScroll(onClose);

  const lastVisitedFilms = useMemo(() => {
    if (!savedFilmIds) {
      return [];
    }

    const parsedIds: string[] = JSON.parse(savedFilmIds);

    const filteredFilms = parsedIds.reduce<FilmData[]>((result, filmId) => {
      const film = films.find((film) => film.id === filmId);

      if (film) {
        return [...result, film];
      }

      return result;
    }, []);

    return filteredFilms;
  }, [savedFilmIds, films]);

  return (
    <div
      className={classNames(styles.appMenu, {
        [styles.openAppMenu]: isOpen,
      })}
      ref={containerRef}
    >
      <Menu config={mainMenu} />
      {Boolean(lastVisitedFilms.length) && (
        <div className={styles.visitedFilmsWrapper}>
          <div className={styles.visitedFilmsTitle}>Last visited titles:</div>
          <div className={styles.visitedFilmsList}>
            {lastVisitedFilms.map((film) => (
              <RouterLink to={buildRouterLink('film', film.id)} key={film.id}>
                {film.title}
              </RouterLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { AppMenu };
