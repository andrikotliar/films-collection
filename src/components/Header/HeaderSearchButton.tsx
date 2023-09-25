import { Dispatch, FC, SetStateAction } from 'react';
import { Button } from '@/components/Button';
import { SearchIcon } from '@/assets/icons';

type HeaderSearchButtonProps = {
  isSearchVisible: boolean;
  setIsSearchVisible: Dispatch<SetStateAction<boolean>>;
}

const HeaderSearchButton: FC<HeaderSearchButtonProps> = ({
  isSearchVisible,
  setIsSearchVisible,
}) => {
  return (
    <Button
      design="ghost"
      className="header__search-button"
      onClick={() => setIsSearchVisible(!isSearchVisible)}
      icon={<SearchIcon color="#fff" />}
      isActive={isSearchVisible}
      activeClassName="header__action--active"
    />
  );
};

export { HeaderSearchButton };