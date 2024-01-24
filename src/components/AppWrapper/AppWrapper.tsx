import { Navigation } from '@/components';
import classes from './AppWrapper.module.css';
import { FC, PropsWithChildren } from 'react';
import { globalMenu } from '@/configs';
import { useLocation } from 'react-router-dom';

const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  return (
    <div className={classes.app}>
      <Navigation
        links={globalMenu}
        checkIsActive={(link) => link === location.pathname}
        rootClassName={classes.navigation}
        menuWrapperClassName={classes.menu}
        headerClassName={classes.navigationHeader}
      />
      {children}
    </div>
  );
};

export { AppWrapper };
