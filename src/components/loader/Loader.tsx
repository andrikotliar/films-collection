import { FC } from 'react';
import styles from './Loader.module.css';
import classNames from 'classnames';
import { Icons } from '@/components/icons/Icons';

type LoaderProps = {
  isFullPage?: boolean;
  iconClassName?: string;
};

const Loader: FC<LoaderProps> = ({ isFullPage = false, iconClassName }) => {
  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.fullPage]: isFullPage,
      })}
    >
      <Icons
        icon="loader"
        className={classNames(styles.loader, 'spin', iconClassName)}
      />
    </div>
  );
};

export { Loader, type LoaderProps };
