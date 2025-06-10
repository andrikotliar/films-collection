import { FilmDetails } from '@/types';
import { CSSProperties, useMemo } from 'react';
import styles from './summary-section.module.css';
import { Poster, Summary, Trailers } from './components';
import { getFilmSummaryConfig } from '../../-helpers';
import { TitleRow } from '../title-row/title-row';
import { env } from '@/configs';

type SummarySectionProps = {
  film: FilmDetails;
};

export const SummarySection = ({ film }: SummarySectionProps) => {
  const filmConfig = useMemo(() => {
    return getFilmSummaryConfig(film);
  }, [film]);

  const style = {
    '--bg-url': `url(${env.baseMediaUrl}/${film.poster})`,
  } as CSSProperties;

  return (
    <div className={styles.summaryLayout} style={style}>
      <Poster image={film.poster} title={film.title} />
      <div className={styles.info}>
        <TitleRow data={film} />
        <Summary config={filmConfig} />
      </div>
      <Trailers data={film.trailers} type={film.type} />
    </div>
  );
};
