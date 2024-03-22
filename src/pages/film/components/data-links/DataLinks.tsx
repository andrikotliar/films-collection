import { FC, useMemo } from 'react';
import { FilmData } from '@/common/types';
import { DataLink } from './components';
import { getDataLinkConfig } from '@/pages/film/helpers';

import styles from './DataLinks.module.css';

type Props = {
  film: FilmData;
};

const DataLinks: FC<Props> = ({ film }) => {
  const dataLinks = useMemo(() => {
    if (!film) {
      return [];
    }

    return getDataLinkConfig(film);
  }, [film]);

  return (
    <div className={styles.dataLinks}>
      {dataLinks.map((item, index) => (
        <div className={styles.group} key={index}>
          {Array.isArray(item.value) ? (
            item.value.map((value) => (
              <DataLink {...item} value={value} key={value} />
            ))
          ) : (
            <DataLink {...item} />
          )}
        </div>
      ))}
    </div>
  );
};

export { DataLinks };
