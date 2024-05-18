import { FC } from 'react';
import { Diagram, Legend } from './components';
import { DiagramColorEnum } from './common/enums';
import { getFormattedValue, hasBoxOfficeBenefit } from './helpers';

import styles from './BoxOffice.module.css';

type BoxOfficeProps = {
  budget?: number;
  boxOffice?: number;
};

const BoxOffice: FC<BoxOfficeProps> = ({ budget, boxOffice }) => {
  const isBoxOfficeHigher = hasBoxOfficeBenefit(budget, boxOffice);

  const boxOfficeColor = isBoxOfficeHigher
    ? DiagramColorEnum.GREEN
    : DiagramColorEnum.RED;

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
