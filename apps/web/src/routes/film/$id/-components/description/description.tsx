import { ContentLayout } from '~/routes/film/$id/-components/content-layout/content-layout';
import styles from './description.module.css';

type DescriptionProps = {
  value: string;
};

export const Description = ({ value }: DescriptionProps) => {
  return (
    <ContentLayout>
      <div className={styles.description}>{value}</div>
    </ContentLayout>
  );
};
