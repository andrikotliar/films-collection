import classes from './AppWrapper.module.css';
import { FC, PropsWithChildren } from 'react';

const AppWrapper: FC<PropsWithChildren> = ({
  children
}) => {
  return (
    <div className={classes.app}>
      {children}
    </div>
  );
};

export { AppWrapper };