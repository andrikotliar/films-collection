import type { api, ApiResponse } from '~/shared';
import styles from './collections.module.css';
import { Link } from '@tanstack/react-router';
import { getColorBaseOnFirstLetter } from '~/routes/films/$id/-components/summary-section/helpers';

type CollectionsProps = {
  list: ApiResponse<typeof api.films.get>['collections'];
};

export const Collections = ({ list }: CollectionsProps) => {
  return (
    <div className={styles.collections}>
      {list.map((collection) => (
        <Link
          to="/"
          search={{ collectionId: collection.id }}
          className={styles.collection_link}
          style={{ backgroundColor: getColorBaseOnFirstLetter(collection.title) }}
        >
          <span className={styles.hash}>#</span>
          <span>{collection.title}</span>
        </Link>
      ))}
    </div>
  );
};
