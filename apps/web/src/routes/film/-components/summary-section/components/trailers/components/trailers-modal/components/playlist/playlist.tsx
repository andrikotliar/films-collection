import { Video } from '../video/video';
import { FilmTrailer } from '~/common';
import { useState } from 'react';
import styles from './playlist.module.css';
import { PlayIcon } from 'lucide-react';
import classNames from 'classnames';

type PlaylistProps = {
  trailers: FilmTrailer[];
  previewLabel: string;
};

export const Playlist = ({ trailers, previewLabel }: PlaylistProps) => {
  const [shouldAutoPlay, setShouldAutoPlay] = useState(trailers.length === 1);
  const [activeVideoId, setActiveVideoId] = useState(trailers[0].videoId);

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
      {trailers.length > 1 && (
        <div className={styles.track}>
          {trailers.map((trailer) => (
            <button
              key={trailer.id}
              className={classNames(styles.trailerButton, {
                [styles.activeTrailerButton]: activeVideoId === trailer.videoId,
              })}
              onClick={() => handleSetActiveVideoId(trailer.videoId)}
              disabled={activeVideoId === trailer.videoId}
              style={{
                backgroundImage: `url(https://img.youtube.com/vi/${trailer.videoId}/default.jpg)`,
              }}
            >
              <span className={styles.previewTitle}>
                {previewLabel} {trailer.order}
              </span>
              <PlayIcon className={styles.playIcon} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
