import { FC } from 'react';
import { getFormattedValue } from './helpers';
import styles from './MoneyValue.module.css';
import classNames from 'classnames';

type MoneyValueProps = {
  value: number | null;
  status?: 'success' | 'failure' | 'default';
};

const MoneyValue: FC<MoneyValueProps> = ({ value, status = 'default' }) => {
  return (
    <div className={classNames(styles.moneyValue, styles[status])}>
      <span className={styles.currency}>$</span>
      <span className={styles.value}>
        {value ? getFormattedValue(value) : 'N/A'}
      </span>
    </div>
  );
};

export { MoneyValue };
