import { FC } from 'react';
import { SummaryBlock } from '../SummaryBlock/SummaryBlock';
import styles from './Summary.module.css';
import { SummaryConfig } from '@/pages/film/types';

type SummaryProps = {
  config: SummaryConfig[];
};

export const Summary: FC<SummaryProps> = ({ config }) => {
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
