import { buildLink } from '@/heplers';
import { Link } from 'react-router-dom';
import './styles.css'

const TopLine = ({ filmData }) => {
  return (
    <div className="top-line">
      <Link to={buildLink('year', filmData.year)} className="top-line__link top-line__link--highlight">
        {filmData.year}
      </Link>
      <div className="top-line__group">
        {filmData.genres.map((genre, idx) => (
          <Link to={buildLink('genres', genre)} className="top-line__link" key={idx}>
            {genre}
          </Link>
        ))}
      </div>
      <span to={buildLink('duration', filmData.duration)} className="top-line__link top-line__link--static">
        {filmData.duration} min
      </span>
    </div>
  );
};

export default TopLine;