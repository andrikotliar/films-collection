import styles from './films-search.module.css';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { searchFilmsQuery } from '@/queries';
import { useQuery } from '@tanstack/react-query';
import { SearchMenuContent } from './components';
import { debounce } from '@/helpers';
import { SearchIcon } from 'lucide-react';
import { Loader } from '@/components/loader/loader';
import { PopupMenu } from '@/components/popup-menu/popup-menu';

export const FilmsSearch = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchString, setSearchString] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data, isLoading } = useQuery(searchFilmsQuery(searchString));

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

  const handleFocus = (event: ChangeEvent<HTMLInputElement>) => {
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
      <div className={styles.inputWrapper}>
        <input
          type="text"
          name="search"
          className={styles.input}
          placeholder="Search films..."
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
        <SearchMenuContent
          films={data ?? []}
          onFilmOpen={handleFinishInteraction}
        />
      </PopupMenu>
    </div>
  );
};
