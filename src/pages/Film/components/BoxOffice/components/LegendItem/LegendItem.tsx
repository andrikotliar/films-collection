import classes from './LegendItem.module.css';
import { FC } from 'react';
import classNames from 'classnames';
import { SubClassNamesEnum } from '../../helpers';

type LegendProps = {
  type: 'Budget' | 'Box Office';
  subClassName?: SubClassNamesEnum;
};

const LegendItem: FC<LegendProps> = ({
  type,
  subClassName,
}) => {
  return (
    <div
      className={classNames(
        classes.legendItem,
        subClassName && classes[subClassName],
      )}
    >
      {type}
    </div>
  );
};

export { LegendItem };
