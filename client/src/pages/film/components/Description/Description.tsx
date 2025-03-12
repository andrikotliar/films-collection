import { FC } from 'react';
import styles from './Description.module.css';
import { Season } from '@/types';
import { getFormattedDate } from '@/helpers';

type DescriptionProps = {
  text: string;
  seasons?: Season[];
};

export const Description: FC<DescriptionProps> = ({ text, seasons = [] }) => {
  return (
    <div className={styles.descriptions}>
      <p className={styles.text}>{text}</p>
      {seasons.map((season) => (
        <div key={season.id} className={styles.season}>
          <h3>{season.title ?? `Season ${season.number}`}</h3>
          <div className={styles.seasonDetails}>
            {season.episodesCount} episodes | Started{' '}
            {getFormattedDate(season.releaseDate)}
          </div>
          <p className={styles.text}>{season.description}</p>
        </div>
      ))}
    </div>
  );
};
