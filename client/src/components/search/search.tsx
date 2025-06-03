import styles from './search.module.css';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import {
  ChangeEvent,
  FocusEventHandler,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { debounce } from '@/helpers';
import { PopupMenu } from '../popup-menu/popup-menu';
import { FieldLabel } from '@/components/field-label/field-label';
import { Loader } from '@/components/loader/loader';

type ChildrenProps<T> = {
  data?: T;
  searchString: string | null;
  onFinishInteraction: VoidFunction;
};

type SearchProps<T> = {
  children: (props: ChildrenProps<T>) => ReactNode;
  query: (searchString: string | null) => UseQueryOptions<T, Error, T, any>;
  theme?: 'light' | 'dark';
  placeholder?: string;
  label?: string;
};

export const Search = <T extends unknown>({
  children,
  query,
  theme = 'light',
  placeholder = 'Search...',
  label,
}: SearchProps<T>) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchString, setSearchString] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data, isLoading } = useQuery(query(searchString));

  const handleCloseSearchDropdown = () => {
    setSearchString(null);
    setIsMenuOpen(false);
  };

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    if (searchValue.length) {
      setSearchString(searchValue);
      setIsMenuOpen(true);

      return;
    }

    setSearchString(null);
    setIsMenuOpen(false);
  }, []);

  const debouncedSearch = debounce(handleSearch, 1000);

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

  const handleFinishInteraction = () => {
    handleCloseSearchDropdown();
    handleClearSearch();
  };

  return (
    <div className={styles.search}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <div className={styles.inputWrapper}>
        <input
          type="text"
          name="search"
          className={classNames(styles.input, styles[theme])}
          placeholder={placeholder}
          onChange={debouncedSearch}
          onFocus={handleFocus}
          ref={searchInputRef}
        />
        <SearchIcon className={styles.searchIcon} />
        {isLoading && (
          <div className={styles.loaderWrapper}>
            <Loader size={20} />
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
        {children({
          onFinishInteraction: handleFinishInteraction,
          data,
          searchString,
        })}
      </PopupMenu>
    </div>
  );
};
