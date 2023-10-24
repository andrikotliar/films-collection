import { PlayIcon } from '@/assets/icons';
import classes from './Poster.module.css';
import { Dispatch, FC, SetStateAction } from 'react';
import { buildMediaPath } from '@/helpers';

type PosterProps = {
  poster: string;
  caption?: string;
  title: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const Poster: FC<PosterProps> = ({
  poster,
  caption,
  title,
  setIsModalOpen,
}) => {
  const posterUrl = buildMediaPath('posters', poster);

  return (
    <div className={classes.posterWrapper}>
      <img src={posterUrl} alt={caption || title} className={classes.poster} />
      <button
        className={classes.trailerButton}
        onClick={() => setIsModalOpen(true)}
      >
        <PlayIcon className={classes.playIcon} />
        <span>Watch trailer</span>
      </button>
    </div>
  );
};

export { Poster };
