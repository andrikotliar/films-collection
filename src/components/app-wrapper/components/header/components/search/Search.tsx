import {
  ChangeEvent,
  FocusEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { debounce, searchFilm } from '@/helpers';
import { PopupMenu } from '@/components/popup-menu/PopupMenu';
import { FilmsContext } from '@/context';
import { FilmData } from '@/common/types';
import styles from './Search.module.css';
import { SearchMenuContent } from './components';
import { LoaderCircleIcon, SearchIcon } from 'lucide-react';

const Search = () => {
  const { films } = useContext(FilmsContext);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchPending, setIsSearchPending] = useState(false);
  const [filteredFilms, setFilteredFilms] = useState<FilmData[]>([]);

  const focusSearch = (event: KeyboardEvent) => {
    if (event.key === 'F2' && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleCloseSearchDropdown = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    if (searchValue.length) {
      const foundFilms = searchFilm(searchValue, films);

      setFilteredFilms(foundFilms);
      setIsMenuOpen(true);
      setIsSearchPending(false);

      return;
    }

    setIsSearchPending(false);
    setIsMenuOpen(false);
  }, []);

  const debouncedSearch = debounce(handleSearch, 1000);

  const handleIsPending = useCallback(() => {
    if (!isSearchPending) {
      setIsSearchPending(true);
    }
  }, [isSearchPending]);

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    if (!isMenuOpen && event.target.value.length) {
      handleSearch(event);
    }
  };

  const handleClearSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  const handleOpenFilmFinish = () => {
    handleCloseSearchDropdown();
    handleClearSearch();
  };

  useEffect(() => {
    document.addEventListener('keydown', focusSearch);

    return () => {
      document.removeEventListener('keydown', focusSearch);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search by title..."
          onChange={(event) => {
            handleIsPending();
            debouncedSearch(event);
          }}
          onFocus={handleFocus}
          ref={searchInputRef}
        />
        <SearchIcon className={styles.searchIcon} />
        {isSearchPending && (
          <div className={styles.loaderWrapper}>
            <LoaderCircleIcon
              className={classNames(styles.loaderIcon, 'spin')}
            />
          </div>
        )}
      </div>
      <PopupMenu
        isOpen={isMenuOpen}
        onClose={handleCloseSearchDropdown}
        triggerRef={searchInputRef}
        menuMargin={3}
        shouldAdjustToTriggerWidth
        shouldFocusTriggerOnClose={false}
        className={styles.menu}
      >
        <SearchMenuContent
          films={filteredFilms}
          onFilmOpen={handleOpenFilmFinish}
        />
      </PopupMenu>
    </div>
  );
};

export { Search };
