import type { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './styles.module.css';

type FormProps<T extends Record<string, unknown>> = {
  children?: ReactNode;
  onSubmit?: (data: T) => Promise<unknown>;
};

export const Form = <T extends Record<string, unknown>>({ children, onSubmit }: FormProps<T>) => {
  const form = useFormContext<T>();

  return (
    <form className={styles.form} onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}>
      {children}
    </form>
  );
};
