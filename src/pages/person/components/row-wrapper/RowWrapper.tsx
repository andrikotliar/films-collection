import { FC, PropsWithChildren } from 'react';
import styles from './RowWrapper.module.css';

type Props = {
  title: string;
};

const RowWrapper: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <div className={styles.row}>
      <h3 className={styles.rowTitle}>{title}</h3>
      {children}
    </div>
  );
};

export { RowWrapper };
