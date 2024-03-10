import styles from './DisplayValue.module.css';
import { FC } from 'react';
import { PropsWithClassName } from '@/common';
import { FormattedValue } from '@/pages/Film/components/BoxOffice/helpers';
import classNames from 'classnames';

type Props = PropsWithClassName<{
  option: FormattedValue;
}>;

const DisplayValue: FC<Props> = ({ option, className }) => {
  return (
    <div className={classNames(styles.displayValue, className)}>
      <div className={styles.number}>${option.shortValue}</div>
      <div className={styles.order}>{option.order}</div>
    </div>
  );
};

export { DisplayValue };
