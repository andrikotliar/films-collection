import { FC } from 'react';
import classNames from 'classnames';
import { PropsWithClassName } from '@/common/types';
import { FormattedValue } from '@/pages/film/components/box-office/helpers';

import styles from './DisplayValue.module.css';

type DisplayValueProps = PropsWithClassName<{
  option: FormattedValue;
}>;

const DisplayValue: FC<DisplayValueProps> = ({ option, className }) => {
  return (
    <div className={classNames(styles.displayValue, className)}>
      <div className={styles.number}>${option.shortValue}</div>
      <div className={styles.order}>{option.order}</div>
    </div>
  );
};

export { DisplayValue };
