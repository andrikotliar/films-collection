import './styles.css';
import Poster from "../Poster";
import Trailer from "../Trailer";
import { FC } from 'react';

type FilmMediaProps = {
  poster: string;
  title: string;
  trailer: string;
}

const FilmMedia: FC<FilmMediaProps> = ({
  poster,
  title,
  trailer
}) => {
  return (
    <div className="film__media">
      <Poster poster={poster} title={title} />
      <Trailer trailer={trailer} />
    </div>
  );
};

export default FilmMedia;