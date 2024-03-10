import styles from './Description.module.css';
import { FC, useState } from 'react';
import { MediaItem, SeasonType, Summary } from '@/common';
import { DataArea, RouterLink } from '@/components';
import { Link } from 'react-router-dom';
import { buildLink } from '@/helpers';
import { SeriesHeader } from '@/pages/Film/components/Description/components';

type Props = {
  description: Summary[];
  media: MediaItem[];
  seasons?: SeasonType[];
};

const Description: FC<Props> = ({ description, seasons }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <SeriesHeader
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        seasons={seasons}
      />
      <DataArea className={styles.wrapper}>
        <div className={styles.description}>
          {seasons && (
            <div className={styles.details}>
              <div className={styles.data}>
                <span className={styles.prop}>Episodes:</span>{' '}
                {seasons?.[activeIndex].episodesCount}
              </div>
              <div className={styles.data}>
                <span className={styles.prop}>Release year:</span>
                <RouterLink to={buildLink('year', seasons[activeIndex].year)}>
                  {seasons[activeIndex].year}
                </RouterLink>
              </div>
            </div>
          )}
          {description[activeIndex].text}
        </div>
      </DataArea>
    </div>
  );
};

export { Description };
