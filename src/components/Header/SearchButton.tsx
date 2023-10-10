import classes from './SearchButton.module.css';
import { Dispatch, FC, SetStateAction } from 'react';
import { Button } from '@/components/Button';
import { SearchIcon } from '@/assets/icons';

type HeaderSearchButtonProps = {
  isSearchVisible: boolean;
  setIsSearchVisible: Dispatch<SetStateAction<boolean>>;
};

const HeaderSearchButton: FC<HeaderSearchButtonProps> = ({
  isSearchVisible,
  setIsSearchVisible,
}) => {
  return (
    <Button
      design="ghost"
      className={classes.searchButton}
      onClick={() => setIsSearchVisible(!isSearchVisible)}
      icon={<SearchIcon color="#fff" />}
      isActive={isSearchVisible}
    />
  );
};

export { HeaderSearchButton };
