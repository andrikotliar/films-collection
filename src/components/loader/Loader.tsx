import { FC } from 'react';
import styles from './Loader.module.css';
import classNames from 'classnames';
import { Icons } from '@/components/icons/Icons';

type Props = {
  isFullPage?: boolean;
  iconClassName?: string;
};

const Loader: FC<Props> = ({ isFullPage = false, iconClassName }) => {
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

export { Loader };
