import { type ChangeEvent, useCallback, useRef, useState } from 'react';
import { searchFilmsQuery, debounce } from '~/common';
import { useQuery } from '@tanstack/react-query';
import { SearchMenuContent } from './search-menu-content';
import { SearchIcon } from 'lucide-react';
import { Loader } from '~/components/loader/loader';
import { PopupMenu } from '~/components/popup-menu/popup-menu';

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
    <div className="flex flex-col gap-1 w-full">
      <div className="relative">
        <input
          type="text"
          name="search"
          className="peer text-sm text-sky-600 p-2.5 w-full pl-10 outline-none border border-gray-300 rounded-lg bg-gray-50 transition focus:border-sky-600 placeholder:text-gray-400"
          placeholder="Search films..."
          onChange={debouncedSearch}
          onFocus={handleFocus}
          ref={searchInputRef}
        />
        <SearchIcon className="text-gray-400 absolute top-1/2 left-2.5 h-5 w-5 cursor-pointer transition -translate-y-1/2 peer-focus:text-sky-600" />
        {isLoading && (
          <div className="absolute top-1/2 right-2.5 w-5 h-5 -translate-y-1/2">
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
        className="overflow-y-auto"
      >
        <SearchMenuContent films={data ?? []} onFilmOpen={handleFinishInteraction} />
      </PopupMenu>
    </div>
  );
};
