import { FC, PropsWithChildren } from 'react';
import styles from './SummaryBlock.module.css';

type SummaryBlockProps = {
  label?: string;
};

const SummaryBlock: FC<PropsWithChildren<SummaryBlockProps>> = ({
  label,
  children,
}) => {
  return (
    <div className={styles.summaryBlock}>
      {label && <div className={styles.label}>{label}:</div>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export { SummaryBlock };