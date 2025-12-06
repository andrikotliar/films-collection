import styles from "./form-title.module.css";
import { type PropsWithChildren } from 'react';

type FormTitleProps = PropsWithChildren;

export const FormTitle = ({ children }: FormTitleProps) => {
  return <h2 className={styles.form_title}>{children}</h2>;
};
