import { FC, PropsWithChildren } from 'react';
import styles from './summary-block.module.css';

type SummaryBlockProps = {
  label?: string;
};

export const SummaryBlock: FC<PropsWithChildren<SummaryBlockProps>> = ({
  label,
  children,
}) => {
  return (
    <div className={styles.summaryBlock}>
      {label && <div className={styles.label}>{label}:</div>}
      <div>{children}</div>
    </div>
  );
};
