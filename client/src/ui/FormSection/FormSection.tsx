import { FieldLabel } from '@/ui/FieldLabel/FieldLabel';
import { FC, PropsWithChildren, useState } from 'react';
import styles from './FormSection.module.css';
import classNames from 'classnames';
import { Maximize2Icon, Minimize2Icon } from 'lucide-react';

type FormSectionProps = PropsWithChildren<{
  label?: string;
}>;

export const FormSection: FC<FormSectionProps> = ({ children, label }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleContentVisibility = () => {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  };

  return (
    <div className={styles.formSection}>
      <div className={styles.header}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <button
          onClick={toggleContentVisibility}
          className={styles.toggleButton}
          type="button"
        >
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
