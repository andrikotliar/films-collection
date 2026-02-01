import styles from './summary-section.module.css';
import { useMemo } from 'react';
import { defineCssProperties, type api, type ApiResponse } from '~/shared';
import {
  Poster,
  Stats,
  SummaryBlock,
  TrailersButton,
} from '~/routes/films/$id/-components/summary-section/components';
import { getFilmSummaryConfig } from '~/routes/films/$id/-helpers';
import { Title } from '~/routes/films/$id/-components/summary-section/components/title/title';
import clsx from 'clsx';

type SummarySectionProps = {
  film: ApiResponse<typeof api.films.get>;
};

export const SummarySection = ({ film }: SummarySectionProps) => {
  const filmConfig = useMemo(() => {
    return getFilmSummaryConfig(film);
  }, [film]);

  return (
    <div
      className={clsx(styles.summary_layout, !film.poster && styles.summary_layout_column)}
      style={defineCssProperties({
        '--bg-url': `url(${film.poster})`,
      })}
    >
      <div className={styles.left_column}>
        {film.poster && <Poster image={film.poster} title={film.title} />}
        {film.trailers.length > 0 && <TrailersButton data={film.trailers} type={film.type} />}
      </div>

      <div className={styles.wrapper}>
        <div className={styles.top_row}>
          <Title>{film.title}</Title>
          <Stats rating={film.rating} />
        </div>
        {filmConfig.map((item) => (
          <SummaryBlock label={item.title} key={item.id}>
            {item.content}
          </SummaryBlock>
        ))}
      </div>
    </div>
  );
};
