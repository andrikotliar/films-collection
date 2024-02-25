import styles from './Legend.module.css';
import { FC } from 'react';
import { LegendColorProps, LegendItem } from '../LegendItem';

type Props = {
  hasBudget: boolean;
  hasBoxOffice: boolean;
} & LegendColorProps;

const Legend: FC<Props> = ({ hasBudget, hasBoxOffice, color }) => {
  return (
    <div className={styles.legend}>
      {hasBudget && <LegendItem type="Budget" />}
      {hasBoxOffice && <LegendItem type="Box Office" color={color} />}
    </div>
  );
};

export { Legend };
