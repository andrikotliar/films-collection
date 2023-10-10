import classes from './Title.module.css';
import { FC, PropsWithChildren } from 'react';

const Title: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className={classes.title}>{children}</h1>;
};

export { Title };
