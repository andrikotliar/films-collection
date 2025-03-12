import { Video } from '../Video/Video';
import { Season } from '@/types';
import { FC, useState } from 'react';
import styles from './Trailers.module.css';
import { PlayIcon } from 'lucide-react';
import classNames from 'classnames';

type TrailersProps = {
  trailerId: string | null;
  seasons: Season[];
};

export const Trailers: FC<TrailersProps> = ({ trailerId, seasons }) => {
  const [shouldAutoPlay, setShouldAutoPlay] = useState(
    Boolean(trailerId) || seasons.length === 1,
  );
  const [activeVideoId, setActiveVideoId] = useState(() => {
    if (trailerId) {
      return trailerId;
    }

    return seasons[0].youtubeTrailerId;
  });

  const handleSetActiveVideoId = (id: string) => {
    setActiveVideoId(id);

    if (!shouldAutoPlay) {
      setShouldAutoPlay(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.videoColumn}>
        <Video trailerId={activeVideoId} shouldAutoPlay={shouldAutoPlay} />
      </div>
      {seasons.length > 1 && (
        <div className={styles.track}>
          {seasons.map((season) => (
            <button
              key={season.id}
              className={classNames(styles.trailerButton, {
                [styles.activeTrailerButton]:
                  activeVideoId === season.youtubeTrailerId,
              })}
              onClick={() => handleSetActiveVideoId(season.youtubeTrailerId)}
              disabled={activeVideoId === season.youtubeTrailerId}
              style={{
                backgroundImage: `url(https://img.youtube.com/vi/${season.youtubeTrailerId}/default.jpg)`,
              }}
            >
              <span className={styles.previewTitle}>
                Season {season.number}
              </span>
              <PlayIcon className={styles.playIcon} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
