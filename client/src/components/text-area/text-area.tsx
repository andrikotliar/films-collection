import styles from './text-area.module.css';
import { ComponentProps, forwardRef } from 'react';
import { FieldLabel } from '../field-label/field-label';
import { FieldError } from '../field-error/field-error';

export type TextAreaProps = {
  label?: string;
  error?: string | string[];
} & Omit<ComponentProps<'textarea'>, 'name'>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, ...textAreaProps }, ref) => {
    return (
      <label className={styles.wrapper}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <textarea className={styles.textArea} ref={ref} {...textAreaProps} />
        <FieldError error={error} />
      </label>
    );
  },
);
