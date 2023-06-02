import { FC } from 'react';
import './styles.css'

type PosterProps = {
  poster: string;
  title: string;
}

const Poster: FC<PosterProps> = ({ poster, title }) => {
  return (
    <div className="film__poster">
      <img src={`/posters/${poster}.webp`} alt={title} />
    </div>
  );
};

export default Poster;