import { getFormattedMoneyValue } from '~/shared';
import { checkHasBoxOfficeBenefit } from './helpers';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import styles from './styles.module.css';
import { DataLink } from '../data-link/data-link';

type Props = {
  budget: number;
  boxOffice: number;
};

export const BoxOfficeValue = ({ budget, boxOffice }: Props) => {
  const isBoxOfficeSuccessful = checkHasBoxOfficeBenefit(budget, boxOffice);

  return (
    <div className={styles.box_office}>
      <DataLink basePath="/" query={{ boxOffice }}>
        {getFormattedMoneyValue(boxOffice)}
      </DataLink>
      {isBoxOfficeSuccessful ? (
        <TrendingUpIcon className={styles.up_icon} />
      ) : (
        <TrendingDownIcon className={styles.down_icon} />
      )}
    </div>
  );
};
