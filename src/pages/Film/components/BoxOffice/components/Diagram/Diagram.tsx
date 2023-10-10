import classes from './Diagram.module.css';
import { FC, useMemo } from 'react';
import classNames from 'classnames';
import {
  FormattedValue,
  SubClassNamesEnum,
  getBoxOfficeTargetValue,
} from '../../helpers';
import { DisplayValue } from '../DisplayValue';

type DiagramProps = {
  budget: FormattedValue | null;
  boxOffice: FormattedValue | null;
  boxOfficeSubClassName: SubClassNamesEnum;
};

const Diagram: FC<DiagramProps> = ({
  budget,
  boxOffice,
  boxOfficeSubClassName,
}) => {
  const maxValue = useMemo(() => {
    return getBoxOfficeTargetValue(
      boxOffice?.value,
      budget?.value,
    );
  }, [boxOffice, budget]);

  const calculatePercent = (value: number) => {
    return (value * 100) / maxValue.value;
  };

  return (
    <div className={classes.diagram}>
      <div className={classes.track}>
        {budget && (
          <div
            className={classes.value}
            style={{
              width: `${calculatePercent(budget.value)}%`,
              backgroundColor: '#FFB74D',
              zIndex: 2,
            }}
            title="Budget"
          >
            <DisplayValue option={budget} />
          </div>
        )}
        {boxOffice && (
          <div
            className={classNames(
              classes.value,
              boxOfficeSubClassName,
            )}
            style={{
              width: `${calculatePercent(
                boxOffice.value,
              )}%`,
              zIndex:
                boxOffice.value < Number(budget?.value)
                  ? 3
                  : 1,
            }}
            title="Box Office"
          >
            <DisplayValue option={boxOffice} />
          </div>
        )}
        <div className={classes.range}>
          <span>$0</span>
          <DisplayValue option={maxValue} isAbs={false} />
        </div>
      </div>
    </div>
  );
};

export { Diagram };
