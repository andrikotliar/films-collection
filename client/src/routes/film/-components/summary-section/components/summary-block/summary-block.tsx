import { ReactNode } from 'react';
import styles from './summary-block.module.css';

type SummaryBlockProps = {
  label?: string;
  children?: ReactNode;
};

export const SummaryBlock = ({ label, children }: SummaryBlockProps) => {
  return (
    <div className={styles.summaryBlock}>
      {label && <div className={styles.label}>{label}:</div>}
      <div>{children}</div>
    </div>
  );
};
