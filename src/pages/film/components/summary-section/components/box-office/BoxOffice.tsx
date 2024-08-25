import { FilmData } from '@/common/types';
import { FC } from 'react';
import { checkHasBoxOfficeBenefit, getFormattedValue } from './helpers';
import styles from './BoxOffice.module.css';
import { MoneyBlock } from './components';

type BoxOfficeProps = Pick<FilmData, 'budget' | 'boxOffice'>;

const BoxOffice: FC<BoxOfficeProps> = ({ budget, boxOffice }) => {
  const formattedBudget = getFormattedValue(budget);
  const formattedBoxOffice = getFormattedValue(boxOffice);

  const hasBoxOfficeBenefit = checkHasBoxOfficeBenefit(budget, boxOffice);

  return (
    <div className={styles.wrapper}>
      <MoneyBlock value={formattedBudget} label="Budget" />
      <MoneyBlock
        value={formattedBoxOffice}
        label="Box Office"
        isVariating
        isBeneficial={hasBoxOfficeBenefit}
      />
    </div>
  );
};

export { BoxOffice };
