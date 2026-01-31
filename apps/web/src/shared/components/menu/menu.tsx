import { Link, useLocation } from '@tanstack/react-router';
import styles from './menu.module.css';
import { type MenuConfigItem } from '~/shared';
import clsx from 'clsx';

type MenuProps = {
  config: MenuConfigItem[];
  className?: string;
};

export const Menu = ({ config, className }: MenuProps) => {
  const location = useLocation();

  const checkActiveState = (currentLink: string) => {
    return location.pathname === currentLink;
  };

  return (
    <div className={clsx(styles.menu, className)}>
      {config.map((configItem) => (
        <Link
          key={configItem.id}
          to={configItem.route}
          className={clsx(styles.link, {
            [styles.active_link]: checkActiveState(configItem.route),
          })}
        >
          {configItem.icon} <span>{configItem.title}</span>
        </Link>
      ))}
    </div>
  );
};
