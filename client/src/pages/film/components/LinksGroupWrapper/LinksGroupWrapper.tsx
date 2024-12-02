import { FC, PropsWithChildren } from 'react';
import styles from './LinksGroupWrapper.module.css';

type LinksGroupWrapperProps = PropsWithChildren;

const LinksGroupWrapper: FC<LinksGroupWrapperProps> = ({ children }) => {
  return <div className={styles.linksGroupWrapper}>{children}</div>;
};

export { LinksGroupWrapper };
