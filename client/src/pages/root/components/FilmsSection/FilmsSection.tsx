import styles from './FilmsSection.module.css';
import { FC } from 'react';
import { FilmsGrid, Loader, Pagination } from '@/components';
import {
  FilmsNotFound,
  AdditionalInfoSection,
  AppliedFilters,
} from './components';
import { FilmsListResponse } from '@/types';

type FilmsSectionProps = {
  data: FilmsListResponse;
  isLoading: boolean;
};

export const FilmsSection: FC<FilmsSectionProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className={styles.filmsSection}>
        <Loader />
      </div>
    );
  }

  if (!data.films.length) {
    return (
      <div className={styles.filmsSection}>
        <AdditionalInfoSection info={data.additionalInfo} />
        <AppliedFilters />
        <FilmsNotFound />
      </div>
    );
  }

  return (
    <div className={styles.filmsSection}>
      <AdditionalInfoSection info={data.additionalInfo} />
      <AppliedFilters />
      <FilmsGrid films={data.films} />
      <div className={styles.paginationWrapper}>
        <Pagination total={data.total} />
      </div>
    </div>
  );
};
