import { DataArea, DataRow } from '@/components';
import { FC, useMemo } from 'react';
import { FilmData } from '@/common/types';
import { DataContent, DataLink } from './components';

import styles from './Summary.module.css';
import { getFilmSummaryConfig, getSeasonConfig } from '@/pages/film/helpers';
import classNames from 'classnames';

type Props = {
  film: FilmData;
  activeIndex: number;
};

const Summary: FC<Props> = ({ film, activeIndex }) => {
  const isSeries = film.type.includes('Series');

  const filmSummaryConfig = useMemo(() => {
    return getFilmSummaryConfig(film);
  }, [film]);

  const seasonSummaryConfig = useMemo(() => {
    return getSeasonConfig(film, activeIndex);
  }, [film, activeIndex]);

  return (
    <div
      className={classNames({
        [styles.wrapper]: isSeries,
      })}
    >
      <div>
        {isSeries && <h3 className={styles.groupTitle}>Series general</h3>}
        <DataArea className={styles.dataArea}>
          {filmSummaryConfig.map((item) => (
            <DataRow
              key={item.property}
              title={item.title}
              className={styles.dataRow}
            >
              <div className={styles.detailsRow}>
                {Array.isArray(item.value) ? (
                  item.value.map((value) => (
                    <DataLink {...item} value={value} key={value} />
                  ))
                ) : (
                  <DataLink {...item} />
                )}
              </div>
            </DataRow>
          ))}
        </DataArea>
      </div>
      {seasonSummaryConfig.length !== 0 && (
        <div>
          <h3 className={styles.groupTitle}>
            «{film.series?.seasons[activeIndex].title}» details
          </h3>
          <DataArea className={styles.dataArea}>
            {seasonSummaryConfig.map((season) => (
              <DataRow
                className={styles.dataRow}
                key={season.property}
                title={season.title}
              >
                <div className={styles.detailsRow}>
                  <DataContent value={season.value} suffix={season.suffix} />
                </div>
              </DataRow>
            ))}
          </DataArea>
        </div>
      )}
    </div>
  );
};

export { Summary };
