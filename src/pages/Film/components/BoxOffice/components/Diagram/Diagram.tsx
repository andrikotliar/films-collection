import './diagram.css';
import { FC, useMemo } from "react";
import classNames from 'classnames';
import { FormattedValue, SubClassNamesEnum, getBoxOfficeTargetValue } from '../../helpers';
import { DiagramDisplayValue } from '../DiagramDisplayValue';

type DiagramProps = {
  budget: FormattedValue | null;
  boxOffice: FormattedValue | null;
  boxOfficeSubClassName: SubClassNamesEnum;
};

const Diagram: FC<DiagramProps> = ({ budget, boxOffice, boxOfficeSubClassName }) => {
  const maxValue = useMemo(() => {
    return getBoxOfficeTargetValue(boxOffice?.value, budget?.value)
  }, [boxOffice, budget]);

  const calculatePercent = (value: number) => {
    return value * 100 / maxValue.value;
  }
  
  return (
    <div className="box-office-diagram">
      <div className="box-office-diagram__track">
        {budget && (
          <div
            className="box-office-diagram__track-value"
            style={{
              width: `${calculatePercent(budget.value)}%`,
              backgroundColor: '#FFB74D',
              zIndex: 2
            }}
            title="Budget"
          >
            <DiagramDisplayValue option={budget} />
          </div>
        )}
        {boxOffice && (
          <div
            className={classNames(
              'box-office-diagram__track-value',
              boxOfficeSubClassName
            )}
            style={{
              width: `${calculatePercent(boxOffice.value)}%`,
              zIndex: boxOffice.value < Number(budget?.value) ? 3 : 1
            }}
            title="Box Office"
          >
            <DiagramDisplayValue option={boxOffice} />
          </div>
        )}
        <div className="box-office-diagram__range">
          <div className="box-office-diagram__range-start">
            $0
          </div>
          <div className="box-office-diagram__range-end">
            <DiagramDisplayValue option={maxValue} isAbs={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Diagram };