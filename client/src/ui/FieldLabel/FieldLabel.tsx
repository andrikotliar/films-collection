import { FC, PropsWithChildren } from 'react';
import styles from './FieldLabel.module.css';
import classNames from 'classnames';

type FieldLabelProps = PropsWithChildren<{
  className?: string;
}>;

export const FieldLabel: FC<FieldLabelProps> = ({ children, className }) => {
  return (
    <span className={classNames(styles.label, className)}>{children}</span>
  );
};
