import styles from './Range.module.css';
import { FC, PropsWithChildren } from 'react';
import { DisplayValue } from '../display-value/DisplayValue';
import { FormattedValue } from '@/pages/film/components/box-office/helpers';

type Props = {
  maxValue: FormattedValue;
};

const Range: FC<PropsWithChildren<Props>> = ({ maxValue, children }) => {
  return (
    <div className={styles.range}>
      <span>$0</span>
      {children}
      <DisplayValue option={maxValue} />
    </div>
  );
};

export { Range };
