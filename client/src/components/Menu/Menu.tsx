import { FC } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import styles from './Menu.module.css';
import { MenuConfigItem, PropsWithClassName } from '@/types';
import classNames from 'classnames';

type MenuProps = {
  config: MenuConfigItem[];
};

export const Menu: FC<PropsWithClassName<MenuProps>> = ({
  config,
  className,
}) => {
  const location = useLocation();

  const checkActiveState = (currentLink: string) => {
    return location.pathname === currentLink;
  };

  return (
    <div className={classNames(styles.menu, className)}>
      {config.map((configItem) => (
        <Link
          key={configItem.id}
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
