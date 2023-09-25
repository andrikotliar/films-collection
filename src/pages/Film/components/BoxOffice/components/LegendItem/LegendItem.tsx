import './legend-item.css';
import { FC } from "react";
import classNames from 'classnames';
import { SubClassNamesEnum } from '../../helpers';

type LegendProps = {
  type: 'Budget' | 'Box Office';
  subClassName?: SubClassNamesEnum;
};

const LegendItem: FC<LegendProps> = ({ type, subClassName }) => {
  return (
    <div className={classNames('legend-item', subClassName)}>
      {type}
    </div>
  );
};

export { LegendItem };