import { useState } from 'react';
import styles from './form-section.module.css';
import clsx from 'clsx';
import { Maximize2Icon, Minimize2Icon } from 'lucide-react';

type FormSectionProps = {
  label?: string;
  children?: React.ReactNode;
};

export const FormSection = ({ children, label }: FormSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleContentVisibility = () => {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  };

  return (
    <div className={styles.form_section}>
      <div className={styles.header}>
        {label && <div className={styles.label}>{label}</div>}
        <button onClick={toggleContentVisibility} className={styles.toggle_button} type="button">
          {isCollapsed ? <Maximize2Icon /> : <Minimize2Icon />}
        </button>
      </div>
      <div
        className={clsx({
          [styles.hidden_content]: isCollapsed,
        })}
      >
        {children}
      </div>
    </div>
  );
};
