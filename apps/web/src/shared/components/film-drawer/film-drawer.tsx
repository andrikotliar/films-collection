import { useQuery } from '@tanstack/react-query';
import { Drawer } from '~/shared/components/drawer/drawer';
import {
  Awards,
  CastAndCrew,
  ContentLayout,
  FilmPageLayout,
  PageSkeleton,
  SummarySection,
} from '~/shared/components/film-drawer/components';
import { getFilmQueryOptions } from '~/shared/helpers';
import { useLocation, useNavigate } from '@tanstack/react-router';
import styles from './film-drawer.module.css';

type FilmDrawerProps = {
  filmId: number;
};

export const FilmDrawer = ({ filmId }: FilmDrawerProps) => {
  const { data: film, isLoading } = useQuery(getFilmQueryOptions(filmId));
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (!film) {
    return;
  }

  const hasExtendedData = film.awards.length !== 0 || film.castAndCrew.length !== 0;

  const closeDrawer = () => {
    navigate({
      to: location.pathname,
      search: ({ filmId: _filmId, ...prev }) => prev,
    });
  };

  return (
    <div className={styles.film_drawer_wrapper}>
      <Drawer isOpen onClose={closeDrawer}>
        <FilmPageLayout>
          <SummarySection film={film} hasExtendedData={hasExtendedData} />
          <ContentLayout>
            {film.awards.length > 0 && <Awards data={film.awards} />}
            {film.castAndCrew.length !== 0 && <CastAndCrew data={film.castAndCrew} />}
          </ContentLayout>
        </FilmPageLayout>
      </Drawer>
    </div>
  );
};
