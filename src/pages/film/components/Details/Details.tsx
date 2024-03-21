import { DataArea, DataRow, RouterLink } from '@/components';
import { detailsConfig } from './details-config';
import { FC } from 'react';
import { FilmData } from '@/common/types';
import { buildLink } from '@/helpers';

import styles from './Details.module.css';

type Props = {
  film: FilmData;
};

const Details: FC<Props> = ({ film }) => {
  return (
    <DataArea>
      {detailsConfig.map((item) => (
        <DataRow key={item.property} title={item.title}>
          <div className={styles.detailsRow}>
            {film[item.property].map((link) => {
              const value = typeof link === 'string' ? link : link.title;

              return (
                <RouterLink to={buildLink(item.property, value)} key={value}>
                  {value}
                </RouterLink>
              );
            })}
          </div>
        </DataRow>
      ))}
    </DataArea>
  );
};

export { Details };
