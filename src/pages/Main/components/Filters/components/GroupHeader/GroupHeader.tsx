import classes from './GroupHeader.module.css';
import { FC, PropsWithChildren } from 'react';

const GroupHeader: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className={classes.groupHeader}>
      <div className={classes.title}>{children}</div>
    </div>
  );
};

export { GroupHeader };
