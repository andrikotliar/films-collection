import './box-office.css';
import { FC } from "react";
import { Diagram, Legend } from './components';
import { getFormattedValue, getBoxOfficeSubClassName } from './helpers';

type BoxOfficeProps = {
  budget?: number;
  boxOffice?: number;
};

const BoxOffice: FC<BoxOfficeProps> = ({ budget, boxOffice }) => {
  const boxOfficeSubClassName = getBoxOfficeSubClassName(budget, boxOffice);

  return (
    <div className="box-office">
      <Legend
        hasBudget={!!budget}
        hasBoxOffice={!!boxOffice}
        subClassName={boxOfficeSubClassName}
      />
      <Diagram
        budget={getFormattedValue(budget)}
        boxOffice={getFormattedValue(boxOffice)}
        boxOfficeSubClassName={boxOfficeSubClassName}
      />
    </div>
  );
};

export default BoxOffice;