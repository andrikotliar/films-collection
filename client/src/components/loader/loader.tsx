import { FC } from 'react';
import styles from './loader.module.css';
import classNames from 'classnames';
import { LoaderCircle } from 'lucide-react';

export type LoaderProps = {
  isFullPage?: boolean;
  iconClassName?: string;
  size?: number;
};

export const Loader: FC<LoaderProps> = ({
  isFullPage = false,
  iconClassName,
  size = 60,
}) => {
  return (
    <div
      className={classNames(styles.loaderContainer, {
        [styles.fullPage]: isFullPage,
      })}
    >
      <LoaderCircle
        className={classNames(styles.loader, 'spin', iconClassName)}
        size={size}
      />
    </div>
  );
};
