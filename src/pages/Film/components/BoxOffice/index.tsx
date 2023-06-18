import './styles.css';
import { MoneyValue } from "@/types";
import { FC } from "react";
import MoneyMainValue from "./components/MoneyMainValue";
import Diagram from './components/Diagram';
import { getMoneySubClassName } from './helpers';

type BoxOfficeProps = {
  budget?: MoneyValue;
  boxOffice?: MoneyValue;
};

const BoxOffice: FC<BoxOfficeProps> = ({ budget, boxOffice }) => {
  const moneyValueSubClassName = getMoneySubClassName(budget?.value, boxOffice?.value);

  return (
    <div className="money">
      <div className="money__info">
        {budget && (
          <MoneyMainValue
            details={budget}
            type="Budget"
          />
        )}
        {boxOffice && (
          <MoneyMainValue
            details={boxOffice}
            type="Box Office"
            subClassName={moneyValueSubClassName}
          />
        )}
      </div>
      <Diagram
        budget={budget}
        boxOffice={boxOffice}
        boxOfficeSubClassName={moneyValueSubClassName}
      />
    </div>
  );
};

export default BoxOffice;