import styles from './text-area.module.css';
import { type ComponentProps, forwardRef } from 'react';
import { FieldLabel } from '../field-label/field-label';
import { FieldError } from '../field-error/field-error';
import { Loader } from '~/shared/components/loader/loader';

export type TextAreaProps = {
  label?: string;
  error?: string | string[];
  isLoading?: boolean;
} & Omit<ComponentProps<'textarea'>, 'name'>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, isLoading = false, ...textAreaProps }, ref) => {
    return (
      <label className={styles.wrapper}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <div className={styles.text_area_wrapper}>
          <textarea className={styles.text_area} ref={ref} {...textAreaProps} />
          {isLoading && (
            <div className={styles.loader_wrapper}>
              <Loader size={30} shouldInheritColor />
            </div>
          )}
        </div>
        <FieldError error={error} />
      </label>
    );
  },
);
