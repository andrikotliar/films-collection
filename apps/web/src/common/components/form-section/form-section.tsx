import { FieldLabel } from '~/common/components/field-label/field-label';
import { ReactNode, useState } from 'react';
import styles from './form-section.module.css';
import classNames from 'classnames';
import { Maximize2Icon, Minimize2Icon } from 'lucide-react';

type FormSectionProps = {
  label?: string;
  children?: ReactNode;
};

export const FormSection = ({ children, label }: FormSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleContentVisibility = () => {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  };

  return (
    <div className={styles.formSection}>
      <div className={styles.header}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <button onClick={toggleContentVisibility} className={styles.toggleButton} type="button">
          {isCollapsed ? <Maximize2Icon /> : <Minimize2Icon />}
        </button>
      </div>
      <div
        className={classNames({
          [styles.hiddenContent]: isCollapsed,
        })}
      >
        {children}
      </div>
    </div>
  );
};
