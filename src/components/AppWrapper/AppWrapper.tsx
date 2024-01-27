import classes from './AppWrapper.module.css';
import { FC, PropsWithChildren } from 'react';
import { Header } from './components';

const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.app}>
      <Header />
      {children}
    </div>
  );
};

export { AppWrapper };
