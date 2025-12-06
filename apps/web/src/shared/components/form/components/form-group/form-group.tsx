import { type PropsWithChildren } from 'react';
import styles from './form-group.module.css';

type FormGroupProps = {
  title: string;
  bodyClassName?: string;
};

export const FormGroup = ({ children, title }: PropsWithChildren<FormGroupProps>) => {
  return (
    <div className={styles.group}>
      <div className={styles.group_header}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.options}>{children}</div>
    </div>
  );
};
