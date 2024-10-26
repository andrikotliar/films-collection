import { Menu } from '@/components/Menu/Menu';
import { mainMenu } from '@/configs';
import styles from './AppMenu.module.css';
import classNames from 'classnames';
import { FC, RefObject, useMemo, useRef } from 'react';
import { useClickOutside, useCloseOnScroll } from '@/hooks';
import { LocalStorageKey } from '@/enums';
import { FilmLinkItem } from '@/types';
import { AppMenuFilmsList } from '../AppMenuFilmsList/AppMenuFilmsList';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services';

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
  const { data: anniversaryList } = useQuery({
    queryKey: ['anniversary-list'],
    queryFn: () => apiClient.get<FilmLinkItem[]>('/films/anniversaries'),
  });

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

    const parsedFilms: FilmLinkItem[] = JSON.parse(lastVisitedFilmsStorage);

    return parsedFilms;
  }, [lastVisitedFilmsStorage]);

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
      {anniversaryList && anniversaryList.length !== 0 && (
        <AppMenuFilmsList
          list={anniversaryList}
          title="Released in this date"
        />
      )}
    </div>
  );
};

export { AppMenu };
