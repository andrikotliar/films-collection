import styles from './toggle.module.css';
import { ChangeEvent } from 'react';

export type ToggleProps = {
  value: boolean;
  onToggle: (isSelected: boolean) => void;
  title?: string;
};

export const Toggle = ({ value, onToggle, title }: ToggleProps) => {
  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    onToggle(isChecked);
  };

  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        checked={value}
        onChange={handleToggle}
        className={styles.checkbox}
      />
      <div className={styles.toggle} />
      {title && <div className={styles.title}>{title}</div>}
    </label>
  );
};
