import {
  ChangeEvent,
  CSSProperties,
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
import { useLocation } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const { films } = useContext(FilmsContext);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchPending, setIsSearchPending] = useState(false);
  const [filteredFilms, setFilteredFilms] = useState<FilmData[]>([]);
  const [searchWrapperStyles, setSearchWrapperStyles] =
    useState<CSSProperties>();

  const isMobile = window.innerWidth <= 480;

  const focusSearch = (event: KeyboardEvent) => {
    if (event.key === 'F2' && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleCloseSearchDropdown = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value;

      if (searchValue.length) {
        const foundFilms = searchFilm(searchValue, films, location.pathname);

        setFilteredFilms(foundFilms);
        setIsMenuOpen(true);
        setIsSearchPending(false);

        return;
      }

      setIsSearchPending(false);
      setIsMenuOpen(false);
    },
    [location.pathname],
  );

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

    if (isMobile) {
      setSearchWrapperStyles({
        position: 'absolute',
        left: 0,
        top: 0,
        padding: 10,
        background: 'white',
      });
    }
  };

  const clearStyles = () => {
    if (isMobile && searchWrapperStyles) {
      setSearchWrapperStyles(undefined);
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
    <div className={styles.wrapper} style={searchWrapperStyles}>
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
          onBlur={clearStyles}
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
