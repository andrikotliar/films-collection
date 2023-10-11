import classes from './DisplayValue.module.css';
import { FC } from 'react';
import { PropsWithClassName } from '@/common';
import { FormattedValue } from '@/pages/Film/components/BoxOffice/helpers';
import classNames from 'classnames';

type DisplayValueProps = PropsWithClassName<{
  option: FormattedValue;
}>;

const DisplayValue: FC<DisplayValueProps> = ({
  option,
  className,
}) => {
  return (
    <div
      className={classNames(
        classes.displayValue,
        className,
      )}
    >
      <div className={classes.number}>
        ${option.shortValue}
      </div>
      <div className={classes.order}>{option.order}</div>
    </div>
  );
};

export { DisplayValue };
