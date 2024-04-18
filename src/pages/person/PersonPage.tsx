import { useParams } from 'react-router-dom';
import { NotFound, FilmsGrid } from '@/components';
import { usePersonFilms } from '@/hooks';
import { PersonRole } from '@/common/enums';
import { Profile } from './components';
import styles from './PersonPage.module.css';

const PersonPage = () => {
  const { personId = 'unknown', position = PersonRole.UNKNOWN } = useParams<{
    personId: string;
    position: PersonRole;
  }>();

  const { films, totalFilmsCount, pagesCount, genres, years, person } =
    usePersonFilms(position, personId);

  if (!person) {
    return <NotFound message="Person with given ID is not found" />;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        {person.position} <span>{person.name}</span>
      </h1>
      <div className={styles.wrapper}>
        <Profile genres={genres} years={years} filmsCount={totalFilmsCount} />
        <FilmsGrid films={films} pagesCount={pagesCount} />
      </div>
    </div>
  );
};

export default PersonPage;
