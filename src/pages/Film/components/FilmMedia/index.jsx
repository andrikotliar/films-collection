import './styles.css';
import Poster from "../Poster";
import Trailer from "../Trailer";

const FilmMedia = ({
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