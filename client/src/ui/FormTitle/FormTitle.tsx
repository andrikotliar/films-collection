import { FC, PropsWithChildren } from 'react';
import styles from './FormTitle.module.css';

type FormTitleProps = PropsWithChildren;

export const FormTitle: FC<FormTitleProps> = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
};
