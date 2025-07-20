import { FilmPerson } from '@/common';
import { Actor } from './components';
import styles from './cast.module.css';
import { ScrollableWrapper } from '@/components';

type CastProps = {
  people: FilmPerson[];
};

export const Cast = ({ people }: CastProps) => {
  const cast = people.filter((item) => item.role === 'ACTOR');

  if (!cast.length || cast.length > 1) {
    return <div>Data not found</div>;
  }

  return (
    <ScrollableWrapper className={styles.cast}>
      {cast[0].people.map((castItem) => (
        <Actor data={castItem} key={castItem.id} />
      ))}
    </ScrollableWrapper>
  );
};
