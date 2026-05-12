import { Link, useLocation } from '@tanstack/react-router';
import styles from './menu.module.css';
import { type MenuConfigItem } from '~/shared';
import clsx from 'clsx';

type MenuProps = {
  config: MenuConfigItem[];
  isStandalone?: boolean;
  className?: string;
};

export const Menu = ({ config, className, isStandalone = false }: MenuProps) => {
  const location = useLocation();

  const checkActiveState = (currentLink: string) => {
    return location.pathname === currentLink;
  };

  return (
    <div className={clsx(styles.menu, className)}>
      {config.map((configItem) => {
        if (configItem.type === 'button') {
          return null;
        }

        return (
          <Link
            key={configItem.id}
            to={configItem.route}
            className={clsx(styles.link, {
              [styles.active_link]: checkActiveState(configItem.route),
              [styles.standaloneMenu]: isStandalone,
            })}
          >
            {configItem.icon} <span>{configItem.title}</span>
          </Link>
        );
      })}
    </div>
  );
};
