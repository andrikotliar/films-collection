import { FC } from 'react';
import classes from './Loader.module.css';
import { LoaderIcon } from '@/assets/icons';
import classNames from 'classnames';

const Loader: FC<{ isFullPage?: boolean }> = ({
  isFullPage = false,
}) => {
  return (
    <div
      className={classNames(classes.wrapper, {
        [classes.fullPage]: isFullPage,
      })}
    >
      <LoaderIcon
        color="#006db7"
        className={classes.loader}
      />
    </div>
  );
};

export { Loader };
