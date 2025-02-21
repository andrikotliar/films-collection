import { FC } from 'react';
import styles from './Description.module.css';
import { Season } from '@/types';
import { Section, TrailerButton } from '@/pages/film/components';

type DescriptionProps = {
  trailerId: string | null;
  text: string;
  seasons?: Season[];
};

export const Description: FC<DescriptionProps> = ({
  text,
  seasons,
  trailerId,
}) => {
  return (
    <div>
      <div>
        <p className={styles.text}>{text}</p>
        {trailerId && <TrailerButton trailerId={trailerId} />}
      </div>
      {seasons && (
        <div className={styles.seasons}>
          {seasons.map((season) => (
            <Section
              title={season.title ?? `Season ${season.number}`}
              key={season.id}
            >
              <p className={styles.text}>{season.description}</p>
              <TrailerButton trailerId={season.youtubeTrailerId} />
            </Section>
          ))}
        </div>
      )}
    </div>
  );
};
