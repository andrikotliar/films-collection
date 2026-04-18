import { Loader } from '~/shared';
import styles from './data-section.module.css';

type DataSectionProps = {
  title: string;
  children?: React.ReactNode;
  isLoading?: boolean;
};

export const DataSection = ({ title, children, isLoading = false }: DataSectionProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
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
