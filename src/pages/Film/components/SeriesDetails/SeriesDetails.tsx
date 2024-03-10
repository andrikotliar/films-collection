import { FC } from 'react';
import { Link } from 'react-router-dom';
import { SeriesExtension } from '@/common';
import { buildLink } from '@/helpers';

import styles from './SeriesDetails.module.css';

type Props = {
  series: SeriesExtension;
};

const SeriesDetails: FC<Props> = ({ series }) => {
  return (
    <div className={styles.seriesDetails}>
      <table>
        <thead>
          <tr>
            <td>Season</td>
            <td>Episodes</td>
            <td>Year</td>
          </tr>
        </thead>
        <tbody>
          {series.seasons.map((season) => (
            <tr key={season.number}>
              <td>{season.number}</td>
              <td>{season.episodesCount}</td>
              <td>
                <Link
                  to={buildLink('year', season.year)}
                  className={styles.link}
                >
                  {season.year}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { SeriesDetails };
