import { FC } from 'react';
import { getFormattedMoneyValue } from '@/helpers';
import { checkHasBoxOfficeBenefit } from './helpers';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import styles from './BoxOfficeValue.module.css';
import { DataLink } from '../DataLink/DataLink';

type BoxOfficeValueProps = {
  budget: number;
  boxOffice: number;
};

export const BoxOfficeValue: FC<BoxOfficeValueProps> = ({
  budget,
  boxOffice,
}) => {
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
