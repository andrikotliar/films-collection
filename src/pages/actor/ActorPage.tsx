import { NotFound } from '@/components';
import { useActorsContext } from '@/context';
import { ActorData } from '@/pages/actor/components';
import { FilmsGrid } from '@/components';
import { useParams } from 'react-router-dom';
import { usePersonFilms } from '@/hooks';
import styles from './ActorPage.module.css';

const ActorPage = () => {
  const { actorId = 'unknown' } = useParams();

  const { actors } = useActorsContext();
  const { films, pagesCount, genres, years } = usePersonFilms('actor', actorId);

  const currentActor = actors?.[actorId];

  if (!currentActor) {
    return <NotFound message="Actor with given ID is not found" />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <ActorData
          name={currentActor.name}
          genres={genres}
          years={years}
          filmsCount={films.length}
        />
      </div>
      <FilmsGrid films={films} pagesCount={pagesCount} />
    </div>
  );
};

export default ActorPage;
