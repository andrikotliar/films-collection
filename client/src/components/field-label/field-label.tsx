import { ReactNode } from 'react';
import styles from './field-label.module.css';
import classNames from 'classnames';

type FieldLabelProps = {
  className?: string;
  children?: ReactNode;
};

export const FieldLabel = ({ children, className }: FieldLabelProps) => {
  return (
    <span className={classNames(styles.label, className)}>{children}</span>
  );
};
