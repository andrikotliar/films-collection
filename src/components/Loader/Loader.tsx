import { FC } from 'react';
import classes from './Loader.module.css';
import { LoaderIcon } from '@/assets/icons';
import classNames from 'classnames';

type Props = {
  isFullPage?: boolean;
  iconClassName?: string;
};

const Loader: FC<Props> = ({ isFullPage = false, iconClassName }) => {
  return (
    <div
      className={classNames(classes.wrapper, {
        [classes.fullPage]: isFullPage,
      })}
    >
      <LoaderIcon
        color="#006db7"
        className={classNames(classes.loader, iconClassName)}
      />
    </div>
  );
};

export { Loader };
