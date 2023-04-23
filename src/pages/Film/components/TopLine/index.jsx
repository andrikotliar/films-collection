import { buildLink } from '@/heplers';
import { Link } from 'react-router-dom';
import { getYearFromReleaseDate } from '@/heplers';
import './styles.css'

const TopLine = ({ filmData }) => {
  return (
    <div className="top-line">
      <Link to={buildLink('year', getYearFromReleaseDate(filmData.releaseDate))} className="top-line__link top-line__link--highlight">
        {getYearFromReleaseDate(filmData.releaseDate)}
      </Link>
      <div className="top-line__list">
        {filmData.genres.map((genre, idx) => (
          <Link to={buildLink('genres', genre)} className="top-line__link" key={idx}>
            {genre}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopLine;