import styles from './form-group.module.css';

type FormGroupProps = {
  title: string;
  children?: React.ReactNode;
};

export const FormGroup = ({ children, title }: FormGroupProps) => {
  return (
    <div className={styles.group}>
      <div className={styles.group_header}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.options}>{children}</div>
    </div>
  );
};
