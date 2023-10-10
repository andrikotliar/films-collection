import classes from './Group.module.css';
import { FC, PropsWithChildren } from 'react';

const Group: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.group}>{children}</div>;
};

export { Group };
