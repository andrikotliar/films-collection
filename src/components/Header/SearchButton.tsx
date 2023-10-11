import classes from './SearchButton.module.css';
import { Dispatch, FC, SetStateAction } from 'react';
import { Button } from '@/components/Button';
import { SearchIcon } from '@/assets/icons';
import { useAppContext } from '@/context';

type HeaderSearchButtonProps = {
  isSearchVisible: boolean;
  setIsSearchVisible: Dispatch<SetStateAction<boolean>>;
};

const SearchButton: FC<HeaderSearchButtonProps> = ({
  isSearchVisible,
  setIsSearchVisible,
}) => {
  const { setIsFilterOpen, isFilterOpen } = useAppContext();

  const handleSearchOpen = () => {
    setIsSearchVisible(isVisible => !isVisible);
    if (isFilterOpen) {
      setIsFilterOpen(false);
    }
  };

  return (
    <Button
      design="ghost"
      className={classes.searchButton}
      onClick={handleSearchOpen}
      icon={<SearchIcon color="#fff" />}
      isActive={isSearchVisible}
    />
  );
};

export { SearchButton };
