import type { PropsWithChildren } from 'react';
import styles from './styles.module.css';

type Props = {
  label?: string;
};

export const SummaryBlock = ({ label, children }: PropsWithChildren<Props>) => {
  return (
    <div className={styles.summaryBlock}>
      {label && <div className={styles.label}>{label}:</div>}
      <div>{children}</div>
    </div>
  );
};
