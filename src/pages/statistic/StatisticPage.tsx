import { useContext } from 'react';
import { FilmsContext } from '@/context';
import styles from './StatisticPage.module.css';

const StatisticPage = () => {
  const { films } = useContext(FilmsContext);

  return (
    <div className={styles.statisticPage}>
      <h1 className={styles.title}>Statistic</h1>
      <p>
        <b>Total films count:</b> <span>{films?.length ?? 0}</span>
      </p>
    </div>
  );
};

export default StatisticPage;
