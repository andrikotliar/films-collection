import {
  ChangeEvent,
  CSSProperties,
  FocusEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { debounce } from '@/helpers';
import { PopupMenu } from '@/components/PopupMenu/PopupMenu';
import styles from './Search.module.css';
import { SearchMenuContent } from '../SearchMenuContent/SearchMenuContent';
import { LoaderCircleIcon, SearchIcon } from 'lucide-react';
import { useLocation } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { FilmsApi } from '@/api';

export const Search = () => {
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchString, setSearchString] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchWrapperStyles, setSearchWrapperStyles] =
    useState<CSSProperties>();

  const { data, isLoading } = useQuery({
    queryKey: ['films-search', searchString],
    queryFn: ({ queryKey }) => FilmsApi.search(queryKey[1]),
    enabled: Boolean(searchString),
    retry: false,
  });

  const isMobile = window.innerWidth <= 480;

  const focusSearch = (event: KeyboardEvent) => {
    if (event.key === 'F2' && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleCloseSearchDropdown = () => {
    setSearchString(null);
    setIsMenuOpen(false);
  };

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value;

      if (searchValue.length) {
        setSearchString(searchValue);
        setIsMenuOpen(true);

        return;
      }

      setSearchString(null);
      setIsMenuOpen(false);
    },
    [location.pathname],
  );

  const debouncedSearch = debounce(handleSearch, 1000);

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
    <div className={styles.search} style={searchWrapperStyles}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          name="search"
          className={styles.input}
          placeholder="Search by title..."
          onChange={debouncedSearch}
          onFocus={handleFocus}
          onBlur={clearStyles}
          ref={searchInputRef}
        />
        <SearchIcon className={styles.searchIcon} />
        {isLoading && (
          <div className={styles.loaderWrapper}>
            <LoaderCircleIcon
              className={classNames(styles.loaderIcon, 'spin')}
            />
          </div>
        )}
      </div>
      <PopupMenu
        isOpen={isMenuOpen && !isLoading}
        onClose={handleCloseSearchDropdown}
        triggerRef={searchInputRef}
        menuMargin={3}
        shouldAdjustToTriggerWidth
        shouldFocusTriggerOnClose={false}
        className={styles.menu}
      >
        <SearchMenuContent
          films={data ?? []}
          onFilmOpen={handleOpenFilmFinish}
        />
      </PopupMenu>
    </div>
  );
};
