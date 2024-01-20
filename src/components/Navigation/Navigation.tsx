import classes from './Navigation.module.css';
import { FilmsCollectionLogo } from '@/assets/logos';
import { Search } from '@/components/Search';

const Header = () => {
  return (
    <nav className={classes.navigation}>
      <div className={classes.logoWrapper}>
        <FilmsCollectionLogo className={classes.logo} />
      </div>
      <Search />
    </nav>
  );
};

export { Header };
