import styles from './BoxOffice.module.css';
import { FC } from 'react';
import { Diagram, Legend } from './components';
import { getFormattedValue, hasBoxOfficeBenefit } from './helpers';
import { LegendColorsEnum } from '@/pages/Film/components/BoxOffice/components/LegendItem';

type BoxOfficeProps = {
  budget?: number;
  boxOffice?: number;
};

const BoxOffice: FC<BoxOfficeProps> = ({ budget, boxOffice }) => {
  const isBoxOfficeHigher = hasBoxOfficeBenefit(budget, boxOffice);

  const boxOfficeColor = isBoxOfficeHigher
    ? LegendColorsEnum.GREEN
    : LegendColorsEnum.RED;

  return (
    <div className={styles.boxOffice}>
      <Legend
        hasBudget={!!budget}
        hasBoxOffice={!!boxOffice}
        color={boxOfficeColor}
      />
      <Diagram
        budget={getFormattedValue(budget)}
        boxOffice={getFormattedValue(boxOffice)}
        color={boxOfficeColor}
      />
    </div>
  );
};

export { BoxOffice };
