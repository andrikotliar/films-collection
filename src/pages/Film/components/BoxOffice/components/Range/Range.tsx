import classes from './Range.module.css';
import { FC, PropsWithChildren } from 'react';
import { DisplayValue } from '@/pages/Film/components/BoxOffice/components/DisplayValue';
import { FormattedValue } from '@/pages/Film/components/BoxOffice/helpers';

type RangeProps = {
  maxValue: FormattedValue;
};

const Range: FC<PropsWithChildren<RangeProps>> = ({
  maxValue,
  children,
}) => {
  return (
    <div className={classes.range}>
      <span>$0</span>
      {children}
      <DisplayValue option={maxValue} />
    </div>
  );
};

export { Range };
