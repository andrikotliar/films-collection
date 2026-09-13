import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { getExternalImageUrl, getHobbiesListQueryOptions, Image } from '~/shared';
import styles from './hobbies-list.module.css';

export const HobbiesList = () => {
  const { data } = useSuspenseQuery(getHobbiesListQueryOptions());

  if (!data.list.length) {
    return null;
  }

  return (
    <div>
      <h2>Explore more my hobbies</h2>
      <div className={styles.grid}>
        {data.list.map((hobby) => (
          <Link
            to="/about/$id"
            params={{ id: hobby.id.toString() }}
            key={hobby.id}
            className={styles.hobby}
          >
            <Image src={getExternalImageUrl(hobby.imageUrl)} className={styles.poster} />
            <span className={styles.hobby_title}>{hobby.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
