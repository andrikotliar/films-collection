import { FilmDetails } from '@/types';
import { CSSProperties, FC, useMemo } from 'react';
import styles from './SummarySection.module.css';
import { Poster, Summary, Trailers } from './components';
import { getFilmSummaryConfig } from '../../helpers';
import { TitleRow } from '../TitleRow/TitleRow';
import { env } from '@/configs';

type SummarySectionProps = {
  film: FilmDetails;
};

export const SummarySection: FC<SummarySectionProps> = ({ film }) => {
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
      <Trailers
        trailerId={film.youtubeTrailerId}
        seasons={film.seriesExtension?.seasons}
      />
    </div>
  );
};
