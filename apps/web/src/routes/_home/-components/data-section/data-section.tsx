import { Button } from '~/shared';
import styles from './data-section.module.css';
import { PlusIcon } from 'lucide-react';

type DataSectionProps = {
  title: string;
  children?: React.ReactNode;
  onAddItem?: () => void;
};

export const DataSection = ({ title, children, onAddItem }: DataSectionProps) => {
  return (
    <div className={styles.data_section}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        {typeof onAddItem === 'function' && (
          <Button onClick={onAddItem} icon={<PlusIcon />} size="small" variant="ghost" />
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};
