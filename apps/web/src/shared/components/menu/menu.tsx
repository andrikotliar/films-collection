import { Link, useLocation } from '@tanstack/react-router';
import styles from './menu.module.css';
import { type MenuConfigItem, type PropsWithClassName } from '~/shared';
import clsx from 'clsx';

type MenuProps = {
  config: MenuConfigItem[];
  isStandalone?: boolean;
};

export const Menu = ({
  config,
  className,
  isStandalone = false,
}: PropsWithClassName<MenuProps>) => {
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
            [styles.standaloneMenu]: isStandalone,
          })}
        >
          {configItem.icon} <span>{configItem.title}</span>
        </Link>
      ))}
    </div>
  );
};
