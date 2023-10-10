import classes from './Header.module.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { InfoIcon } from '@/assets/icons';
import { FilmsCollectionLogo } from '@/assets/logos';
import { Search } from '@/components/Search';
import { IconLink } from '@/components/IconLink';
import { HeaderSearchButton } from '@/components/Header/SearchButton';
import { Container } from '@/components/Container';

const Header = () => {
  const [ isSearchVisible, setIsSearchVisible ] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if(isSearchVisible) {
      setIsSearchVisible(false);
    }
  }, [pathname]);
  
   return (
    <header className={classes.header}>
      <Container className={classes.container}>
        <Link to="/" className={classes.logoLink}>
          <FilmsCollectionLogo className={classes.logoImage} />
        </Link>
        <div className={classes.actions}>
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
      </Container>
    </header>
  );
};

export { Header };
