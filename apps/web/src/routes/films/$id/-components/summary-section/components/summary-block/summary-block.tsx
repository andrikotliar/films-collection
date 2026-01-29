import styles from './summary-block.module.css';

type SummaryBlockProps = {
  label?: string;
  children: React.ReactNode;
};

export const SummaryBlock = ({ label, children }: SummaryBlockProps) => {
  return (
    <div className={styles.summary_block}>
      {label && <div className={styles.label}>{label}:</div>}
      <div>{children}</div>
    </div>
  );
};
