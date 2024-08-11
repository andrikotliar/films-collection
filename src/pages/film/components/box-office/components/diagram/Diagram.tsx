import styles from './Diagram.module.css';
import { FC, useMemo } from 'react';
import classNames from 'classnames';
import { DiagramColor } from '@/pages/film/components/box-office/common/enums';
import {
  FormattedValue,
  getBoxOfficeTargetValue,
} from '@/pages/film/components/box-office/helpers';
import { DisplayValue, Range } from './components';

type DiagramProps = {
  budget: FormattedValue | null;
  boxOffice: FormattedValue | null;
  color: DiagramColor;
};

const Diagram: FC<DiagramProps> = ({ budget, boxOffice, color }) => {
  const maxValue = useMemo(() => {
    return getBoxOfficeTargetValue(boxOffice?.value, budget?.value);
  }, [boxOffice, budget]);

  const calculatePercent = (value: number) => {
    return (value * 100) / maxValue.value;
  };

  return (
    <div className={styles.diagram}>
      <Range maxValue={maxValue}>
        <div className={styles.track}>
          {budget && (
            <div
              title="Budget"
              className={classNames(styles.scale)}
              style={{
                color: DiagramColor.YELLOW,
                width: `${calculatePercent(budget.value)}%`,
                backgroundColor: DiagramColor.YELLOW,
                zIndex: 2,
              }}
            >
              <DisplayValue
                option={budget}
                className={classNames(styles.option, styles.budget)}
              />
            </div>
          )}
          {boxOffice && (
            <div
              title="Box Office"
              className={styles.scale}
              style={{
                color,
                width: `${calculatePercent(boxOffice.value)}%`,
                backgroundColor: color,
                zIndex: boxOffice.value < Number(budget?.value) ? 3 : 1,
              }}
            >
              <DisplayValue
                option={boxOffice}
                className={classNames(styles.option, styles.boxOffice)}
              />
            </div>
          )}
        </div>
      </Range>
    </div>
  );
};

export { Diagram };
