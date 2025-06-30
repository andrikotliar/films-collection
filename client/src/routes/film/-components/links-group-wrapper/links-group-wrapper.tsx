import { ReactNode } from 'react';
import styles from './links-group-wrapper.module.css';

type LinksGroupWrapperProps = {
  children?: ReactNode;
};

export const LinksGroupWrapper = ({ children }: LinksGroupWrapperProps) => {
  return <div className={styles.linksGroupWrapper}>{children}</div>;
};
