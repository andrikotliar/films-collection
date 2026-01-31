import styles from './form-title.module.css';

export const FormTitle = ({ children }: React.PropsWithChildren) => {
  return <h2 className={styles.form_title}>{children}</h2>;
};
