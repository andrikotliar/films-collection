import { FC } from 'react';
import { Diagram, Legend, LegendColorsEnum } from './components';
import { getFormattedValue, hasBoxOfficeBenefit } from './helpers';

import styles from './BoxOffice.module.css';

type Props = {
  budget?: number;
  boxOffice?: number;
};

const BoxOffice: FC<Props> = ({ budget, boxOffice }) => {
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
