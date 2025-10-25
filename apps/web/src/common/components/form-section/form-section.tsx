import { FieldLabel } from '~/common/components/field-label/field-label';
import { useState, type PropsWithChildren } from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';
import { Maximize2Icon, Minimize2Icon } from 'lucide-react';

type Props = {
  label?: string;
};

export const FormSection = ({ children, label }: PropsWithChildren<Props>) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleContentVisibility = () => {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  };

  return (
    <div className={styles.form_section}>
      <div className={styles.header}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <button onClick={toggleContentVisibility} className={styles.toggle_button} type="button">
          {isCollapsed ? <Maximize2Icon /> : <Minimize2Icon />}
        </button>
      </div>
      <div
        className={classNames({
          [styles.hidden_content]: isCollapsed,
        })}
      >
        {children}
      </div>
    </div>
  );
};
