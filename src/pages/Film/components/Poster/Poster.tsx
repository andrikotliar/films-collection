import { FC } from 'react';
import './poster.css'

type PosterProps = {
  poster: string;
  title: string;
}

const Poster: FC<PosterProps> = ({ poster, title }) => {
  return (
    <div className="film-poster">
      <img src={poster} alt={title} />
    </div>
  );
};

export { Poster };