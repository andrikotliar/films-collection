import { ReactNode } from 'react';
import styles from './form-title.module.css';

type FormTitleProps = {
  children?: ReactNode;
};

export const FormTitle = ({ children }: FormTitleProps) => {
  return <h2 className={styles.title}>{children}</h2>;
};
