import { buildLink } from '@/heplers';
import { Link } from 'react-router-dom';
import './styles.css'

const TopLine = ({ filmData }) => {
  return (
    <div className="top-line">
      <Link to={buildLink('year', filmData.year)} className="top-line__link">
        {filmData.year}
      </Link>
      <div className="top-line__group">
        {filmData.genres.map((genre, idx) => (
          <Link to={buildLink('genres', genre)} className="top-line__link" key={idx}>
            {genre}
          </Link>
        ))}
      </div>
      <Link to={buildLink('duration', filmData.duration)} className="top-line__link">
        {filmData.duration} min
      </Link>
    </div>
  );
};

export default TopLine;