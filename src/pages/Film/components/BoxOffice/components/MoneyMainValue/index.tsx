import './styles.css';
import { FC } from "react";
import classNames from 'classnames';
import { MoneyValue } from "@/types";
import { SubClassNamesEnum } from '../../helpers';

type MoneyMainValueProps = {
  details: MoneyValue;
  type: 'Budget' | 'Box Office';
  subClassName?: SubClassNamesEnum;
};

const MoneyMainValue: FC<MoneyMainValueProps> = ({ details, type, subClassName }) => {
  return (
    <div className={classNames('money-main-value', subClassName)}>
      <span className="money-main-value__type">
        {type}:
      </span>
      <div className="money-main-value__data">
        ${details.value} {details.suffix}
      </div>
    </div>
  );
};

export default MoneyMainValue;