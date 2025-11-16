import styles from './styles.module.css';
import { useMemo } from 'react';
import { type FilmDetails, defineCssProperties, env } from '~/shared';
import {
  Poster,
  SummaryBlock,
  TitleRow,
  Trailers,
} from '~/routes/films/-components/summary-section/components';
import { getFilmSummaryConfig } from '~/routes/films/-helpers';

type Props = {
  film: FilmDetails;
};

export const SummarySection = ({ film }: Props) => {
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
      <Poster image={film.poster} title={film.title} />
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
      <Trailers data={film.trailers} type={film.type} />
    </div>
  );
};
