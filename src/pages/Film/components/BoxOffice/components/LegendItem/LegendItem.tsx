import styles from './LegendItem.module.css';
import { FC } from 'react';

enum LegendColorsEnum {
  YELLOW = '#ffb74d',
  RED = '#d32f2f',
  GREEN = '#4db6ac',
}

type LegendColorProps = {
  color: LegendColorsEnum;
};

type Props = {
  type: 'Budget' | 'Box Office';
} & Partial<LegendColorProps>;

const LegendItem: FC<Props> = ({ type, color = LegendColorsEnum.YELLOW }) => {
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

export { LegendItem, LegendColorsEnum };
export type { LegendColorProps };
