import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Menu.module.css';
import { MenuConfigItem } from '@/types';
import classNames from 'classnames';

type MenuProps = {
  config: MenuConfigItem[];
};

const Menu: FC<MenuProps> = ({ config }) => {
  const location = useLocation();

  const checkActiveState = (currentLink: string) => {
    return location.pathname === currentLink;
  };

  return (
    <div className={styles.wrapper}>
      {config.map((configItem) => (
        <Link
          key={configItem.route}
          to={configItem.route}
          className={classNames(styles.link, {
            [styles.activeLink]: checkActiveState(configItem.route),
          })}
        >
          {configItem.icon} <span>{configItem.title}</span>
        </Link>
      ))}
    </div>
  );
};

export { Menu };
