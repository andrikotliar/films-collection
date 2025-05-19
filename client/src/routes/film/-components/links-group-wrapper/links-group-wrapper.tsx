import { FC, PropsWithChildren } from 'react';
import styles from './links-group-wrapper.module.css';

type LinksGroupWrapperProps = PropsWithChildren;

export const LinksGroupWrapper: FC<LinksGroupWrapperProps> = ({ children }) => {
  return <div className={styles.linksGroupWrapper}>{children}</div>;
};
