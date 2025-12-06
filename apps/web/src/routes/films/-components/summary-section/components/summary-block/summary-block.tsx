import type { PropsWithChildren } from 'react';
import styles from './summary-block.module.css';

type SummaryBlockProps = {
  label?: string;
};

export const SummaryBlock = ({ label, children }: PropsWithChildren<SummaryBlockProps>) => {
  return (
    <div className={styles.summary_block}>
      {label && <div className={styles.label}>{label}:</div>}
      <div>{children}</div>
    </div>
  );
};
