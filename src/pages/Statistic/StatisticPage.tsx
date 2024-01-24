import { useFilmsContext } from '@/context';
import classes from './StatisticPage.module.css';

const StatisticPage = () => {
  const { initialFilmsList } = useFilmsContext();

  return (
    <div className={classes.statisticPage}>
      <h1 className={classes.title}>Statistic</h1>
      <p>
        <b>Total films count:</b> <span>{initialFilmsList.length}</span>
      </p>
    </div>
  );
};

export default StatisticPage;
