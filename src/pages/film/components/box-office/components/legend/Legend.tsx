import { FC } from 'react';
import { LegendItem } from './components';
import { DiagramColor } from '@/pages/film/components/box-office/common/enums';

import styles from './Legend.module.css';

type LegendProps = {
  hasBudget: boolean;
  hasBoxOffice: boolean;
  color: DiagramColor;
};

const Legend: FC<LegendProps> = ({ hasBudget, hasBoxOffice, color }) => {
  return (
    <div className={styles.legend}>
      {hasBudget && <LegendItem type="Budget" />}
      {hasBoxOffice && <LegendItem type="Box Office" color={color} />}
    </div>
  );
};

export { Legend };
