import classes from './SearchButton.module.css';
import { Dispatch, FC, SetStateAction } from 'react';
import { Button } from '@/components/Button';
import { SearchIcon } from '@/assets/icons';

type HeaderSearchButtonProps = {
  isSearchVisible: boolean;
  setIsSearchVisible: Dispatch<SetStateAction<boolean>>;
};

const SearchButton: FC<HeaderSearchButtonProps> = ({
  isSearchVisible,
  setIsSearchVisible,
}) => {
  const handleSearchOpen = () => {
    setIsSearchVisible(isVisible => !isVisible);
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
