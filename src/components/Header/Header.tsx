import './header.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { InfoIcon } from '@/assets/icons';
import { FilmsCollectionLogo } from '@/assets/logos';
import { Search } from '@/components/Search';
import { IconLink } from '@/components/IconLink';
import { HeaderSearchButton } from '@/components/Header/HeaderSearchButton';

const Header = () => {
  const [ isSearchVisible, setIsSearchVisible ] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if(isSearchVisible) {
      setIsSearchVisible(false);
    }
  }, [pathname]);
  
   return (
    <header className="header">
      <div className="header__container container">
        <Link to="/" className="header__logo">
          <FilmsCollectionLogo />
        </Link>
        <div className="header__actions">
          <HeaderSearchButton
            isSearchVisible={isSearchVisible}
            setIsSearchVisible={setIsSearchVisible}
          />
          <Search
            isOpen={isSearchVisible}
            setIsSearchVisible={setIsSearchVisible}
          />
          <IconLink path="/about" icon={<InfoIcon color="#fff" />} />
        </div>
      </div>
    </header>
  );
};

export { Header };
