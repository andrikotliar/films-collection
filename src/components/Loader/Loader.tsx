import { FC } from 'react';
import classes from './Loader.module.css';
import classNames from 'classnames';
import { Loader2 } from 'lucide-react';

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
      <Loader2
        color="#006db7"
        className={classNames(classes.loader, iconClassName)}
      />
    </div>
  );
};

export { Loader };
