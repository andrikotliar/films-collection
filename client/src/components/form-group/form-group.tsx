import styles from './form-group.module.css';
import { FC, PropsWithChildren } from 'react';

type GroupProps = {
  title: string;
  bodyClassName?: string;
};

export const FormGroup: FC<PropsWithChildren<GroupProps>> = ({
  children,
  title,
}) => {
  return (
    <div className={styles.group}>
      <div className={styles.groupHeader}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.options}>{children}</div>
    </div>
  );
};
