import classes from './SectionTitle.module.css';
import { FC, PropsWithChildren } from 'react';

const SectionTitle: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <h2 className={classes.sectionTitle}>{children}</h2>
  );
};

export { SectionTitle };
