import styles from './summary-section.module.css';
import { useMemo } from 'react';
import { defineCssProperties, env, type api, type ApiResponse } from '~/shared';
import {
  Poster,
  SummaryBlock,
  TitleRow,
  TrailersButton,
} from '~/routes/films/$id/-components/summary-section/components';
import { getFilmSummaryConfig } from '~/routes/films/$id/-helpers';

type SummarySectionProps = {
  film: ApiResponse<typeof api.films.get>;
};

export const SummarySection = ({ film }: SummarySectionProps) => {
  const filmConfig = useMemo(() => {
    return getFilmSummaryConfig(film);
  }, [film]);

  return (
    <div
      className={styles.summary_layout}
      style={defineCssProperties({
        '--bg-url': `url(${env.BASE_MEDIA_URL}/${film.poster})`,
      })}
    >
      <div className={styles.left_column}>
        <Poster image={film.poster} title={film.title} />
        <TrailersButton data={film.trailers} type={film.type} />
      </div>
      <div className={styles.wrapper}>
        <TitleRow data={film} />
        <div className={styles.info}>
          {filmConfig.map((item) => (
            <SummaryBlock label={item.title} key={item.id}>
              {item.content}
            </SummaryBlock>
          ))}
        </div>
      </div>
    </div>
  );
};
