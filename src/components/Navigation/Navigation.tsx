import classes from './Navigation.module.css';
import { FilmsCollectionLogo } from '@/assets/logos';
import { Scrollable } from '@/components/Scrollable';
import { Search } from '@/components/Search';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Link = {
  id: string;
  title: string;
  link: string;
  icon: ReactNode;
  isDisabled?: boolean;
  isPrivate?: boolean;
};

type ClassNames = {
  rootClassName?: string;
  headerClassName?: string;
  menuWrapperClassName?: string;
  menuItemClassName?: string;
  menuLinkClassName?: string;
};

type Props = {
  links: Link[];
  checkIsActive: (currentLink: Link['link']) => boolean;
} & ClassNames;

const Navigation: FC<Props> = ({
  links,
  checkIsActive,
  rootClassName,
  headerClassName,
  menuItemClassName,
  menuLinkClassName,
  menuWrapperClassName,
}) => {
  return (
    <Scrollable className={classNames(classes.navigation, rootClassName)}>
      <div className={classNames(classes.navigationHeader, headerClassName)}>
        <Link
          to={{
            pathname: '/',
            search: location.search,
          }}
          className={classes.logoWrapper}
        >
          <FilmsCollectionLogo className={classes.logo} />
        </Link>
        <Search />
      </div>
      <ul className={classNames(classes.menu, menuWrapperClassName)}>
        {links.map((menuItem) => (
          <li
            className={classNames(classes.menuItem, menuItemClassName)}
            key={menuItem.id}
          >
            <Link
              to={menuItem.link}
              className={classNames(classes.menuLink, menuLinkClassName, {
                [classes.disabled]: menuItem.isDisabled,
                [classes.active]: checkIsActive(menuItem.link),
              })}
            >
              {menuItem.icon}
              {menuItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </Scrollable>
  );
};

export { Navigation };
