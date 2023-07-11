import './diagram-disaplay-value.css';
import { FormattedValue } from "@/pages/Film/components/BoxOffice/helpers";
import classNames from 'classnames';
import { FC } from "react";

type DisagramDisplayValueProps = {
  option: FormattedValue;
  isAbs?: boolean;
}

const DiagramDisplayValue: FC<DisagramDisplayValueProps> = ({
  option,
  isAbs = true
}) => {
  return (
    <div className={classNames('diagram-display-value', {
      'diagram-display-abs-value': isAbs
    })}>
      <div className="diagram-display-value__number">
        ${option.shortValue}
      </div>
      <div className="diagram-display-value__order">
        {option.order}
      </div>
    </div>
  );
};

export default DiagramDisplayValue;