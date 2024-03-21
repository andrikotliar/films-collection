import { FC } from 'react';
import styles from './Loader.module.css';
import classNames from 'classnames';
import { Loader2 } from 'lucide-react';

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
      <Loader2
        color="#006db7"
        className={classNames(styles.loader, iconClassName)}
      />
    </div>
  );
};

export { Loader };
