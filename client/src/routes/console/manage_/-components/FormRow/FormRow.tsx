import { FC, PropsWithChildren } from 'react';
import styles from './FormRow.module.css';

type FormRowProps = PropsWithChildren<{
  gap?: number;
  position?: 'start' | 'end' | 'center';
  align?: 'start' | 'center' | 'end';
  wrap?: boolean;
}>;

export const FormRow: FC<FormRowProps> = ({
  children,
  gap = 10,
  position = 'start',
  align = 'start',
  wrap = false,
}) => {
  return (
    <div
      className={styles.formRow}
      style={{
        gap,
        justifyContent: position,
        alignItems: align,
        flexWrap: wrap ? 'wrap' : 'nowrap',
      }}
    >
      {children}
    </div>
  );
};
