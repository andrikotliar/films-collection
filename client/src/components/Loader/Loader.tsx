import { FC } from 'react';
import styles from './Loader.module.css';
import classNames from 'classnames';
import { LoaderCircle } from 'lucide-react';

type LoaderProps = {
  isFullPage?: boolean;
  iconClassName?: string;
};

const Loader: FC<LoaderProps> = ({ isFullPage = false, iconClassName }) => {
  return (
    <div
      className={classNames(styles.loaderContainer, {
        [styles.fullPage]: isFullPage,
      })}
    >
      <LoaderCircle
        className={classNames(styles.loader, 'spin', iconClassName)}
      />
    </div>
  );
};

export { Loader, type LoaderProps };
