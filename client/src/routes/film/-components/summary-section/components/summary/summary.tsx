import { SummaryBlock } from '../summary-block/summary-block';
import styles from './summary.module.css';
import { SummaryConfig } from '@/routes/film/-types';

type SummaryProps = {
  config: SummaryConfig[];
};

export const Summary = ({ config }: SummaryProps) => {
  return (
    <div className={styles.summary}>
      {config.map((item) => (
        <SummaryBlock label={item.title} key={item.id}>
          {item.content}
        </SummaryBlock>
      ))}
    </div>
  );
};
