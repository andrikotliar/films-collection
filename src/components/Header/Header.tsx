import classes from './Header.module.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { InfoIcon } from '@/assets/icons';
import { FilmsCollectionLogo } from '@/assets/logos';
import { Search } from '@/components/Search';
import { IconLink } from '@/components/IconLink';
import { SearchButton } from '@/components/Header/SearchButton';
import { Container } from '@/components/Container';
import { useFilmsContext } from '@/context';

const Header = () => {
  const { initialFilmsList } = useFilmsContext();
  const [isSearchVisible, setIsSearchVisible] =
    useState(false);
  const [searchString, setSearchString] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setSearchString(location.search);
    }
  }, [location]);

  useEffect(() => {
    if (isSearchVisible) {
      setIsSearchVisible(false);
    }
  }, [location.pathname]);

  return (
    <header className={classes.header}>
      <Container className={classes.container}>
        <Link
          to={{
            pathname: '/',
            search: searchString,
          }}
          className={classes.logoLink}
        >
          <FilmsCollectionLogo
            className={classes.logoImage}
          />
        </Link>
        <div className={classes.actions}>
          <SearchButton
            isSearchVisible={isSearchVisible}
            setIsSearchVisible={setIsSearchVisible}
          />
          <Search
            isOpen={isSearchVisible}
            setIsSearchVisible={setIsSearchVisible}
          />
          <div className={classes.filmsCount}>
            <b>{initialFilmsList.length}</b>
            <span>Films</span>
          </div>
          <IconLink
            path="/about"
            icon={<InfoIcon color="#fff" />}
          />
        </div>
      </Container>
    </header>
  );
};

export { Header };
