import { PageTitle, SkeletonBlock } from '~/shared';
import styles from './films-grid-skeleton.module.css';

export const FilmsGridSkeleton = () => {
  return (
    <>
      <div>
        <PageTitle>Films Collection</PageTitle>
      </div>
      <div className={styles.grid}>
        {Array.from({ length: 48 }, (_, index) => (
          <div className={styles.item} key={index}>
            <SkeletonBlock width="100%" height="100%" />
          </div>
        ))}
      </div>
    </>
  );
};
