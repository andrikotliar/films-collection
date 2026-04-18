import { Button, Loader } from '~/shared';
import styles from './data-section.module.css';
import { PlusIcon } from 'lucide-react';

type DataSectionProps = {
  title: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  onAddItem?: () => void;
};

export const DataSection = ({
  title,
  children,
  isLoading = false,
  onAddItem,
}: DataSectionProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        {typeof onAddItem === 'function' && (
          <Button onClick={onAddItem} icon={<PlusIcon />} size="small" variant="ghost" />
        )}
      </div>
      <div className={styles.content}>
        {children}
        {isLoading && (
          <div className={styles.loader_wrapper}>
            <Loader size={30} shouldInheritColor />
          </div>
        )}
      </div>
    </div>
  );
};
