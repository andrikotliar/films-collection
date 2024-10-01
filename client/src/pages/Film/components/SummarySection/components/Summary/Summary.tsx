import { FC } from 'react';
import { SummaryConfig } from '../../../../helpers';
import { SummaryBlock } from './components';
import styles from './Summary.module.css';

type SummaryProps = {
  config: SummaryConfig[];
};

const Summary: FC<SummaryProps> = ({ config }) => {
  return (
    <div className={styles.wrapper}>
      {config.map((item) => (
        <SummaryBlock label={item.title} key={item.id}>
          {item.content}
        </SummaryBlock>
      ))}
    </div>
  );
};

export { Summary };
