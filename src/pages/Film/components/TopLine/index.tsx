import './styles.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { buildLink } from '@/heplers';
import { GeneralFilm } from '@/types';

const TopLine: FC<{ filmData: GeneralFilm }> = ({ filmData }) => {
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
      <span className="top-line__link top-line__link--static">
        {filmData.duration} min
      </span>
    </div>
  );
};

export default TopLine;