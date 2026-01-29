import styles from './field-label.module.css';
import clsx from 'clsx';

type FieldLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export const FieldLabel = ({ children, className }: FieldLabelProps) => {
  return <span className={clsx(styles.label, className)}>{children}</span>;
};
