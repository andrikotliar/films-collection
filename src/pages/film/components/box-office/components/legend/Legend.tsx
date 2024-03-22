import { FC } from 'react';
import { LegendItem } from './components';
import { DiagramColorEnum } from '@/pages/film/components/box-office/common/enums';

import styles from './Legend.module.css';

type Props = {
  hasBudget: boolean;
  hasBoxOffice: boolean;
  color: DiagramColorEnum;
};

const Legend: FC<Props> = ({ hasBudget, hasBoxOffice, color }) => {
  return (
    <div className={styles.legend}>
      {hasBudget && <LegendItem type="Budget" />}
      {hasBoxOffice && <LegendItem type="Box Office" color={color} />}
    </div>
  );
};

export { Legend };
