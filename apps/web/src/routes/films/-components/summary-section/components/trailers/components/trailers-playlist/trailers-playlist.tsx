import styles from './trailers-playlist.module.css';
import { useState } from 'react';
import { PlayIcon } from 'lucide-react';
import clsx from 'clsx';
import { type FilmTrailer } from '~/shared';
import { Video } from '~/routes/films/-components/summary-section/components/trailers/components/video/video';

type TrailersPlaylistProps = {
  trailers: FilmTrailer[];
  previewLabel: string;
};

export const TrailersPlaylist = ({ trailers, previewLabel }: TrailersPlaylistProps) => {
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
      <div className={styles.video_column}>
        <Video trailerId={activeVideoId} shouldAutoPlay={shouldAutoPlay} />
      </div>
      {trailers.length > 1 && (
        <div className={styles.track}>
          {trailers.map((trailer) => (
            <button
              key={trailer.id}
              className={clsx(styles.trailer_button, {
                [styles.active_trailer_button]: activeVideoId === trailer.videoId,
              })}
              onClick={() => handleSetActiveVideoId(trailer.videoId)}
              disabled={activeVideoId === trailer.videoId}
              style={{
                backgroundImage: `url(https://img.youtube.com/vi/${trailer.videoId}/default.jpg)`,
              }}
            >
              <span className={styles.preview_title}>
                {previewLabel} {trailer.order}
              </span>
              <PlayIcon className={styles.play_icon} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
