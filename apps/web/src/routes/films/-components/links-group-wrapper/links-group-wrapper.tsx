import { ReactNode } from 'react';
import styles from './styles.module.css';

type LinksGroupWrapperProps = {
  children?: ReactNode;
};

export const LinksGroupWrapper = ({ children }: LinksGroupWrapperProps) => {
  return <div className={styles.linksGroupWrapper}>{children}</div>;
};
