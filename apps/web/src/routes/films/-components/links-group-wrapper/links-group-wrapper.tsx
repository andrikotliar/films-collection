import { type PropsWithChildren } from 'react';
import styles from './styles.module.css';

export const LinksGroupWrapper = ({ children }: PropsWithChildren) => {
  return <div className={styles.linksGroupWrapper}>{children}</div>;
};
