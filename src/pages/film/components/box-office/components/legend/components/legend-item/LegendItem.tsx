import { FC } from 'react';

import styles from './LegendItem.module.css';
import { DiagramColor } from '@/pages/film/components/box-office/common/enums';

type LegendItemProps = {
  type: 'Budget' | 'Box Office';
  color?: DiagramColor;
};

const LegendItem: FC<LegendItemProps> = ({
  type,
  color = DiagramColor.YELLOW,
}) => {
  return (
    <div
      className={styles.legendItem}
      style={{
        color,
      }}
    >
      <span>{type}</span>
    </div>
  );
};

export { LegendItem };
