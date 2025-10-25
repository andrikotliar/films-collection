import { type PropsWithChildren } from 'react';
import styles from './styles.module.css';

type Props = {
  title: string;
  bodyClassName?: string;
};

export const FormGroup = ({ children, title }: PropsWithChildren<Props>) => {
  return (
    <div className={styles.group}>
      <div className={styles.groupHeader}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.options}>{children}</div>
    </div>
  );
};
