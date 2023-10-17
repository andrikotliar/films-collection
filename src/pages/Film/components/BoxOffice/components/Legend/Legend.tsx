import classes from './Legend.module.css';
import { FC } from 'react';
import {
  LegendColorProps,
  LegendItem,
} from '../LegendItem';

type LegendProps = {
  hasBudget: boolean;
  hasBoxOffice: boolean;
} & LegendColorProps;

const Legend: FC<LegendProps> = ({
  hasBudget,
  hasBoxOffice,
  color,
}) => {
  return (
    <div className={classes.legend}>
      {hasBudget && <LegendItem type="Budget" />}
      {hasBoxOffice && (
        <LegendItem type="Box Office" color={color} />
      )}
    </div>
  );
};

export { Legend };
