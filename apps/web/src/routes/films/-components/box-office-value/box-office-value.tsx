import { getFormattedMoneyValue } from '~/shared';
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
