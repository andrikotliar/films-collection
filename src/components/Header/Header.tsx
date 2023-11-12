import classes from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { InfoIcon } from '@/assets/icons';
import { FilmsCollectionLogo } from '@/assets/logos';
import { Search } from '@/components/Search';
import { IconLink } from '@/components/IconLink';
import { Container } from '@/components/Container';

const Header = () => {
  const location = useLocation();

  return (
    <header className={classes.header}>
      <Container className={classes.container}>
        <Link
          to={{
            pathname: '/',
            search: location.search,
          }}
          className={classes.logoLink}
        >
          <FilmsCollectionLogo className={classes.logoImage} />
        </Link>
        <Search />
        <IconLink
          path="/about"
          icon={<InfoIcon color="#fff" />}
          className={classes.infoLink}
        />
      </Container>
    </header>
  );
};

export { Header };
