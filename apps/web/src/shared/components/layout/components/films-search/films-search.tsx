import styles from './films-search.module.css';
import { type ChangeEvent, useCallback, useRef, useState } from 'react';
import { debounce, useFilmsSearch } from '~/shared';
import { SearchMenuContent } from '../search-menu-content/search-menu-content';
import { SearchIcon } from 'lucide-react';
import { Loader } from '~/shared/components/loader/loader';
import { PopupMenu } from '~/shared/components/popup-menu/popup-menu';

export const FilmsSearch = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchString, setSearchString] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data, isLoading } = useFilmsSearch(searchString);

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
    <div className={styles.films_search}>
      <div className={styles.input_wrapper}>
        <input
          type="text"
          name="search"
          className={styles.search_input}
          placeholder="Search films..."
          onChange={debouncedSearch}
          onFocus={handleFocus}
          ref={searchInputRef}
        />
        <SearchIcon className={styles.search_icon} />
        {isLoading && (
          <div className={styles.search_loader}>
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
        <SearchMenuContent films={data ?? []} onFilmOpen={handleFinishInteraction} />
      </PopupMenu>
    </div>
  );
};
