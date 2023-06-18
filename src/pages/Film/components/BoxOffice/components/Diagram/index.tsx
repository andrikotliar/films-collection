import { SubClassNamesEnum, getMoneySubClassName } from '@/pages/Film/components/BoxOffice/helpers';
import './styles.css';
import { MoneyValue } from "@/types";
import { FC, useMemo } from "react";
import classNames from 'classnames';

type DiagramProps = {
  budget?: MoneyValue;
  boxOffice?: MoneyValue;
  boxOfficeSubClassName: SubClassNamesEnum;
}

const DEFAULT_MIN_VALUE = 1_000_000;
const DEFAULT_MAX_VALUE = 1_000_000_000;

const Diagram: FC<DiagramProps> = ({ budget, boxOffice, boxOfficeSubClassName }) => {
  const maxValue = useMemo(() => {
    if(boxOffice && boxOffice.suffix === 'billion') {
      return {
        number: boxOffice.value,
        alias: `${boxOffice.value}B`
      };
    }
    return {
      number: DEFAULT_MAX_VALUE,
      alias: '1B'
    };
  }, [boxOffice]);

  const calculatePercent = (option: MoneyValue) => {
    const range = option.suffix === 'million' ? DEFAULT_MIN_VALUE : DEFAULT_MAX_VALUE;
    return option.value * range * 100 / maxValue.number;
  }
  
  return (
    <div className="money-diagram">
      <div className="money-diagram__track">
        {budget && (
          <div
            className="money-diagram__track-value"
            style={{
              width: `${calculatePercent(budget)}%`,
              backgroundColor: '#FFB74D',
              zIndex: 2
            }}
            title="Budget"
          >
            <span>{budget.value}{budget.suffix[0].toUpperCase()}</span>
          </div>
        )}
        {boxOffice && (
          <div
            className={classNames(
              'money-diagram__track-value',
              boxOfficeSubClassName
            )}
            style={{
              width: `${calculatePercent(boxOffice)}%`,
              zIndex: boxOffice.value < Number(budget?.value) ? 3 : 1
            }}
            title="Box Office"
          >
            <span>{boxOffice.value}{boxOffice.suffix[0].toUpperCase()}</span>
          </div>
        )}
        <div className="money-diagram__range">
          <div className="money-diagram__range-start ">
            0
          </div>
          <div className="money-diagram__range-end ">
            {maxValue.alias}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Diagram;