import { Link, useLocation } from '@tanstack/react-router';
import styles from './menu.module.css';
import { type MenuConfigItem } from '@/common';
import classNames from 'classnames';

type MenuProps = {
  config: MenuConfigItem[];
  className?: string;
  isStandalone?: boolean;
};

export const Menu = ({ config, className, isStandalone = false }: MenuProps) => {
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
            [styles.standaloneMenu]: isStandalone,
          })}
        >
          {configItem.icon} <span>{configItem.title}</span>
        </Link>
      ))}
    </div>
  );
};
