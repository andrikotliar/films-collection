import { getFormattedMoneyValue } from '@/common';
import { checkHasBoxOfficeBenefit } from './helpers';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import styles from './box-office-value.module.css';
import { DataLink } from '../data-link/data-link';

type BoxOfficeValueProps = {
  budget: number;
  boxOffice: number;
};

export const BoxOfficeValue = ({ budget, boxOffice }: BoxOfficeValueProps) => {
  const isBoxOfficeSuccessful = checkHasBoxOfficeBenefit(budget, boxOffice);

  return (
    <div className={styles.boxOffice}>
      <DataLink basePath="/" query={{ boxOffice }}>
        {getFormattedMoneyValue(boxOffice)}
      </DataLink>
      {isBoxOfficeSuccessful ? (
        <TrendingUpIcon className={styles.upIcon} />
      ) : (
        <TrendingDownIcon className={styles.downIcon} />
      )}
    </div>
  );
};
