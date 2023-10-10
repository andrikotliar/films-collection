import classes from './DisplayValue.module.css';
import { FormattedValue } from '@/pages/Film/components/BoxOffice/helpers';
import classNames from 'classnames';
import { FC } from 'react';

type DisplayValueProps = {
  option: FormattedValue;
  isAbs?: boolean;
};

const DisplayValue: FC<DisplayValueProps> = ({
  option,
  isAbs = true,
}) => {
  return (
    <div
      className={classNames(classes.displayValue, {
        [classes.absoluteValue]: isAbs,
      })}
    >
      <div className={classes.number}>
        ${option.shortValue}
      </div>
      <div className={classes.order}>{option.order}</div>
    </div>
  );
};

export { DisplayValue };
