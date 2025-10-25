import { ReactNode } from 'react';
import styles from './styles.module.css';

type GroupProps = {
  title: string;
  bodyClassName?: string;
  children?: ReactNode;
};

export const FormGroup = ({ children, title }: GroupProps) => {
  return (
    <div className={styles.group}>
      <div className={styles.groupHeader}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.options}>{children}</div>
    </div>
  );
};
