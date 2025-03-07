import { FC } from 'react';
import styles from './Loader.module.css';
import classNames from 'classnames';
import { LoaderCircle } from 'lucide-react';

export type LoaderProps = {
  isFullPage?: boolean;
  iconClassName?: string;
};

export const Loader: FC<LoaderProps> = ({
  isFullPage = false,
  iconClassName,
}) => {
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
