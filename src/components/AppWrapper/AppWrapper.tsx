import classes from './AppWrapper.module.css';
import { FC, PropsWithChildren } from 'react';
import { RootNavigation } from './components';

const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.app}>
      <RootNavigation />
      {children}
    </div>
  );
};

export { AppWrapper };
