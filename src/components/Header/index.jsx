import './styles.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchIcon, FilterIcon, HomeIcon, InfoIcon, StatsIcon, GridIcon } from '@/assets/icons';
import FilmsCollectionLogo from '@/assets/logo/FilmsCollectionLogo';
import Search from '../Search';
import IconButton from './components/IconButton';
import IconLink from './components/IconLink';
import CollectionsMenu from '../CollectionsMenu';

const Header = () => {
  const location = useLocation();
  const [ showCollections, setShowCollections ] = useState(false);
  const [ showSearch, setShowSearch ] = useState(false);

  useEffect(() => {
    if(showCollections) {
      setShowCollections(false);
    }
  }, [location])

  return (
    <header className="header">
      <div className="header__container container">
        <Link to="/" className="header__logo">
          <FilmsCollectionLogo />
        </Link>
        <div className="header__actions">
          <IconLink
            link="/"
            active={location.pathname === '/'}
            title="Home"
          >
            <HomeIcon />
          </IconLink>
          <IconButton
            active={showCollections}
            title="Collections"
            onClick={() => setShowCollections(!showCollections)}
          >
            <GridIcon />
          </IconButton>
          <IconLink
            link="/stats"
            active={location.pathname === '/stats'}
            title="Statistic"
          >
            <StatsIcon />
          </IconLink>
          <IconLink
            link="/info"
            active={location.pathname === '/info'}
            title="Info"
          >
            <InfoIcon />
          </IconLink>
          <IconButton
            active={showSearch}
            title="Filter"
            className="header__filter-icon"
          >
            <FilterIcon  />
          </IconButton>
          <IconButton
            active={showSearch}
            title="Search"
            className="header__search-icon"
            onClick={() => setShowSearch(!showSearch)}
          >
            <SearchIcon />
          </IconButton>
          <Search isOpen={showSearch} />
        </div>
      </div>
      <CollectionsMenu isOpen={showCollections} />
    </header>
  );
};

export default Header;
