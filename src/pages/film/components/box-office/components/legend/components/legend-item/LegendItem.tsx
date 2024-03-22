import { FC } from 'react';

import styles from './LegendItem.module.css';
import { DiagramColorEnum } from '@/pages/film/components/box-office/common/enums';

type Props = {
  type: 'Budget' | 'Box Office';
  color?: DiagramColorEnum;
};

const LegendItem: FC<Props> = ({ type, color = DiagramColorEnum.YELLOW }) => {
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
