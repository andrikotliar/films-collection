import { DataArea, DataGrid, DataRow } from '@/components';
import { FC, useMemo } from 'react';
import { FilmData } from '@/common/types';
import { DataContent, DataLink } from './components';

import styles from './Summary.module.css';
import { getFilmSummaryConfig, getSeasonConfig } from '@/pages/film/helpers';
import classNames from 'classnames';
import { Description } from '../description/Description';

type SummaryProps = {
  film: FilmData;
  activeIndex: number;
};

const Summary: FC<SummaryProps> = ({ film, activeIndex }) => {
  const summaryConfig = useMemo(() => {
    return getFilmSummaryConfig(film);
  }, [film]);

  return (
    <DataArea>
      <DataGrid>
        {summaryConfig.map((item) => (
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
      </DataGrid>
      <DataRow title="Synopsis" className={styles.descriptionRow}>
        <Description>{film.description[activeIndex]}</Description>
      </DataRow>
    </DataArea>
  );
};

export { Summary };
