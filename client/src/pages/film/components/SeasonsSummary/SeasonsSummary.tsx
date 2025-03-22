import { getFormattedDate } from '@/helpers';
import { Season } from '@/types';
import { FC } from 'react';
import styles from './SeasonsSummary.module.css';

type SeasonsSummaryProps = {
  seasons: Season[];
};

export const SeasonsSummary: FC<SeasonsSummaryProps> = ({ seasons }) => {
  return (
    <table className={styles.seasonsTable}>
      <thead>
        <tr>
          <th>Season</th>
          <th>Number of episodes</th>
          <th>Start date</th>
        </tr>
      </thead>
      <tbody>
        {seasons.map((season) => (
          <tr key={season.id}>
            <td>{season.number}</td>
            <td>{season.episodesCount}</td>
            <td>{getFormattedDate(season.releaseDate)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
