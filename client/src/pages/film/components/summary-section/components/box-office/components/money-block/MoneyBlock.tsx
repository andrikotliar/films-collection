import { FC } from 'react';
import styles from './MoneyBlock.module.css';
import classNames from 'classnames';
import { CoinsIcon } from 'lucide-react';

type MoneyBlockProps = {
  value: string | null;
  label: string;
  isVariating?: boolean;
  isBeneficial?: boolean;
};

const MoneyBlock: FC<MoneyBlockProps> = ({
  value,
  label,
  isBeneficial = false,
  isVariating = false,
}) => {
  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.beneficial]: isVariating && isBeneficial,
        [styles.notProfitable]: isVariating && !isBeneficial,
      })}
    >
      <CoinsIcon className={styles.icon} />
      <div className={styles.content}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>${value ?? 'N/A'}</div>
      </div>
    </div>
  );
};

export { MoneyBlock };
